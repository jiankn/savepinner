"""Audit the public HTML Google can crawl; uses only the Python standard library."""
import argparse
import concurrent.futures
import datetime
import json
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlsplit
from urllib.request import Request, urlopen
from urllib.error import HTTPError
import xml.etree.ElementTree as ET


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = []
        self.h1 = []
        self.description = []
        self.canonicals = []
        self.alternates = {}
        self.robots = []
        self.links = []
        self.schemas = []
        self.lang = None
        self.capture = None
        self.buffer = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "html":
            self.lang = a.get("lang")
        if tag in ("title", "h1") or (tag == "script" and a.get("type") == "application/ld+json"):
            self.capture, self.buffer = tag, []
        if tag == "meta":
            name = a.get("name", "").lower()
            if name == "description":
                self.description.append(a.get("content", ""))
            if name in ("robots", "googlebot"):
                self.robots.append(a.get("content", ""))
        if tag == "link":
            if "canonical" in a.get("rel", "").split():
                self.canonicals.append(a.get("href"))
            if a.get("hreflang"):
                self.alternates[a["hreflang"]] = a.get("href")
        if tag == "a" and a.get("href"):
            self.links.append(a["href"])

    def handle_data(self, data):
        if self.capture:
            self.buffer.append(data)

    def handle_endtag(self, tag):
        if tag == self.capture:
            value = "".join(self.buffer).strip()
            if tag == "script":
                try:
                    self.schemas.append(json.loads(value))
                except ValueError:
                    self.schemas.append({"parse_error": True})
            else:
                getattr(self, tag).append(value)
            self.capture = None


def fetch(url):
    request = Request(url, headers={"User-Agent": "SavePinnerIndexingAudit/1.0"})
    try:
        response = urlopen(request, timeout=30)
    except HTTPError as error:
        response = error
    with response:
        return response.status, response.url, dict(response.headers), response.read().decode("utf-8", "replace")


def inspect(url):
    try:
        status, final, headers, html = fetch(url)
        page = Page()
        page.feed(html)
        issues = []
        if status != 200:
            issues.append(f"HTTP {status}")
        if final != url:
            issues.append(f"redirect to {final}")
        if page.canonicals != [url]:
            issues.append("canonical mismatch")
        if len(page.title) != 1 or not page.title[0]:
            issues.append("missing or multiple titles")
        if len(page.description) != 1 or not page.description[0]:
            issues.append("missing or multiple descriptions")
        if len(page.h1) != 1:
            issues.append(f"H1 count {len(page.h1)}")
        directives = page.robots + [v for k, v in headers.items() if k.lower() == "x-robots-tag"]
        if any("noindex" in x.lower() or "none" in x.lower().split(",") for x in directives):
            issues.append("noindex in sitemap")
        if not page.lang:
            issues.append("missing document language")
        if any(x.get("parse_error") for x in page.schemas if isinstance(x, dict)):
            issues.append("invalid JSON-LD")
        return {"url": url, "status": status, "final_url": final, "title": page.title,
                "description": page.description, "h1": page.h1, "canonical": page.canonicals,
                "lang": page.lang, "robots": directives, "alternates": page.alternates,
                "links": sorted(set(urljoin(url, x).split("#")[0] for x in page.links)),
                "issues": issues, "html_bytes": len(html.encode())}
    except Exception as error:
        return {"url": url, "issues": [str(error)], "links": [], "alternates": {}}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--base-url", default="https://savepinner.com")
    parser.add_argument("--output", required=True)
    args = parser.parse_args()
    base = args.base_url.rstrip("/")
    status, _, _, xml = fetch(base + "/sitemap.xml")
    if status != 200:
        raise RuntimeError(f"Sitemap returned {status}")
    root = ET.fromstring(xml)
    urls = [x.text for x in root.findall("{*}url/{*}loc")]
    if not urls:
        raise RuntimeError("Expected a nonempty URL sitemap")
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        pages = list(pool.map(inspect, urls))
    by_url = {p["url"]: p for p in pages}
    incoming = Counter(link for p in pages for link in p["links"] if link != p["url"])
    for page in pages:
        page["incoming_pages"] = incoming[page["url"]]
        if not page["incoming_pages"]:
            page["issues"].append("no incoming links from sitemap pages")
        for language, alternate in page["alternates"].items():
            target = by_url.get(alternate)
            if not target:
                page["issues"].append(f"alternate absent from sitemap: {language} {alternate}")
            elif page["url"] not in target["alternates"].values():
                page["issues"].append(f"nonreciprocal hreflang: {language}")
    duplicates = {}
    for field in ("title", "description"):
        counts = Counter(tuple(p.get(field, [])) for p in pages)
        duplicates[field] = [list(value) for value, count in counts.items() if value and count > 1]
    linked_paths = sorted({link for p in pages for link in p["links"]
                           if urlsplit(link).netloc == urlsplit(base).netloc and link not in by_url})
    result = {"checked_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
              "base_url": base, "page_count": len(pages), "pages": pages,
              "duplicates": duplicates, "internal_links_outside_sitemap": linked_paths,
              "robots_txt": fetch(base + "/robots.txt")[3],
              "missing_page_status": fetch(base + "/seo-audit-missing-page-20260905/")[0]}
    output = Path(args.output)
    output.mkdir(parents=True, exist_ok=True)
    (output / "indexing-audit.json").write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({"pages": len(pages), "issues": [p for p in pages if p["issues"]],
                      "duplicates": duplicates, "links_outside_sitemap": linked_paths,
                      "missing_page_status": result["missing_page_status"]}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()

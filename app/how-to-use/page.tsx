import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "How to Use SavePinner",
  description:
    "Which Pinterest links SavePinner supports, step-by-step download instructions for mobile and desktop, and what each error message means.",
  alternates: { canonical: "/how-to-use/" },
};

export default function HowToUsePage() {
  return (
    <ContentPage
      title="How to Use SavePinner"
      intro="SavePinner saves media from a single public Pinterest Pin. Paste the link, check the verified versions, download — done."
    >
      <section>
        <h2>Supported links</h2>
        <ul>
          <li>
            Standard Pins: <code>https://www.pinterest.com/pin/123456789/</code>
          </li>
          <li>
            Regional domains: <code>https://pinterest.co.uk/pin/123456789/</code> and other official
            Pinterest country domains
          </li>
          <li>
            Short links: <code>https://pin.it/abc123</code> — we follow up to 3 redirects and verify
            each hop
          </li>
        </ul>
        <p>
          Not supported: private Pins or Boards, whole-board downloads, profile/feed/search pages,
          and any non-Pinterest URL.
        </p>
      </section>

      <section>
        <h2>On mobile</h2>
        <ol>
          <li>In the Pinterest app, open the Pin, tap the share icon and choose “Copy link”.</li>
          <li>
            Open <Link href="/">SavePinner</Link> and tap <strong>Paste</strong> — the link is filled
            from your clipboard. If your browser blocks clipboard access, tap the field and paste
            manually.
          </li>
          <li>Tap <strong>Download</strong>, review the versions, then tap the one you want to save.</li>
        </ol>
      </section>

      <section>
        <h2>On desktop</h2>
        <ol>
          <li>Open the Pin on pinterest.com and copy the URL from the address bar.</li>
          <li>
            Open <Link href="/">SavePinner</Link> and paste it into the input (Ctrl+V or the Paste
            button).
          </li>
          <li>Click <strong>Download</strong>, then choose a verified version to save the file.</li>
        </ol>
      </section>

      <section>
        <h2>What the result shows</h2>
        <ul>
          <li>Media type: image, GIF or video (verified by the server, not guessed from the URL).</li>
          <li>Each version&apos;s format, dimensions and file size when available.</li>
          <li>
            The top version is the highest resolution we could verify — we never label anything
            “Original” unless we can prove it.
          </li>
          <li>Download links expire after 5 minutes; resolve the Pin again if a link lapses.</li>
        </ul>
      </section>

      <section>
        <h2>Error messages explained</h2>
        <table>
          <thead>
            <tr>
              <th>Message</th>
              <th>What it means / what to do</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Please enter a valid Pinterest Pin link</td>
              <td>The text is not a Pinterest URL. Check the formats above.</td>
            </tr>
            <tr>
              <td>This type of Pinterest page is not supported yet</td>
              <td>Boards, profiles and search pages are not supported — only single Pins.</td>
            </tr>
            <tr>
              <td>The short link redirected to an unsupported address</td>
              <td>The pin.it link did not lead to a public Pin. Try the full Pin URL.</td>
            </tr>
            <tr>
              <td>This content is not publicly accessible</td>
              <td>The Pin is private, deleted or sign-in-only.</td>
            </tr>
            <tr>
              <td>No downloadable media file was found</td>
              <td>We could not verify any media on that Pin right now.</td>
            </tr>
            <tr>
              <td>Too many requests</td>
              <td>Rate limit reached — wait a few seconds and retry.</td>
            </tr>
            <tr>
              <td>The source content is temporarily unreachable / timed out</td>
              <td>Pinterest or the network is slow — retry in a moment.</td>
            </tr>
          </tbody>
        </table>
      </section>
    </ContentPage>
  );
}

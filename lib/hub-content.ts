export const PINTEREST_DOWNLOADER_HUB = {
  path: "/pinterest-downloader/",
  lastModified: "2026-08-02",
  seoTitle: "Pinterest Downloader — Images, Videos, GIFs & Stories",
  metaDescription:
    "Paste a public Pinterest Pin URL to find available images, videos or GIFs. Compare supported link formats, practical limits and free tools.",
  h1: "Pinterest Downloader for Every Public Pin",
} as const;

export const HUB_TOOLS = [
  {
    title: "Pinterest Image Downloader",
    description:
      "Save the original image or choose a smaller Pinterest thumbnail size.",
    output: "JPG, PNG or WebP image",
    bestFor: "Single-image Pins and thumbnails",
    href: "/",
  },
  {
    title: "Pinterest Video Downloader",
    description:
      "See the MP4 qualities Pinterest exposes for a public video Pin.",
    output: "MP4 video",
    bestFor: "Video Pins with downloadable media",
    href: "/pinterest-video-downloader/",
  },
  {
    title: "Pinterest GIF Downloader",
    description:
      "Check whether an animated Pin contains a GIF, a looping video or only a cover image.",
    output: "GIF, MP4 or image",
    bestFor: "Animated Pins and GIF searches",
    href: "/pinterest-gif-downloader/",
  },
  {
    title: "Pinterest Story Pin Downloader",
    description:
      "Inspect older Story or Idea Pin links and save the image or video media Pinterest exposes.",
    output: "Image or MP4; multi-page coverage varies",
    bestFor: "Multi-page and legacy Story/Idea Pins",
    href: "/pinterest-story-downloader/",
  },
] as const;

export const HUB_URL_FORMATS = [
  {
    type: "Public Pin URL",
    example: "https://www.pinterest.com/pin/123456789/",
    status: "Supported",
    behavior: "Checks the public Pin for image, video, GIF or Story media.",
  },
  {
    type: "pin.it short link",
    example: "https://pin.it/AbC123",
    status: "Supported",
    behavior: "Follows Pinterest-only redirects, then checks the resulting public Pin.",
  },
  {
    type: "Pinterest country domain",
    example: "https://uk.pinterest.com/pin/123456789/",
    status: "Supported",
    behavior: "Normalizes an allowed regional Pin URL to the canonical pinterest.com form.",
  },
  {
    type: "Board, profile or search page",
    example: "https://www.pinterest.com/example/board/",
    status: "Not supported",
    behavior: "Open one public Pin from the page and paste that individual Pin URL instead.",
  },
  {
    type: "Private, restricted or deleted Pin",
    example: "A Pin that requires account access",
    status: "Not accessible",
    behavior: "SavePinner does not sign in, bypass permissions or recover deleted content.",
  },
] as const;

export const HUB_DEVELOPER_RESOURCES = [
  {
    title: "TypeScript Pinterest URL normalizer",
    description: "Exact-host URL parsing and normalization without network requests.",
    href: "https://github.com/jiankn/pinterest-url-normalizer",
  },
  {
    title: "Python Pinterest URL normalizer",
    description: "The same URL rules for Python applications and command-line workflows.",
    href: "https://github.com/jiankn/pinterest-url-normalizer-python",
  },
] as const;

export function getPinterestDownloaderHubJsonLd() {
  const pageUrl = `https://savepinner.com${PINTEREST_DOWNLOADER_HUB.path}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#collection`,
        name: PINTEREST_DOWNLOADER_HUB.h1,
        description: PINTEREST_DOWNLOADER_HUB.metaDescription,
        url: pageUrl,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: HUB_TOOLS.map((tool, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: tool.title,
            url: `https://savepinner.com${tool.href}`,
          })),
        },
      },
      {
        "@type": "WebApplication",
        "@id": `${pageUrl}#webapplication`,
        name: "SavePinner Pinterest Downloader",
        description: PINTEREST_DOWNLOADER_HUB.metaDescription,
        url: pageUrl,
        applicationCategory: "Multimedia",
        operatingSystem: "All",
        isAccessibleForFree: true,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      },
    ],
  };
}

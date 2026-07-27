export const PINTEREST_DOWNLOADER_HUB = {
  path: "/pinterest-downloader/",
  lastModified: "2026-07-28",
  seoTitle: "Pinterest Downloader — Images, Videos, GIFs & Stories",
  metaDescription:
    "Choose a free Pinterest downloader for images, videos, GIFs or Story Pins. Compare formats, open the right tool and save public Pins in HD.",
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

import type { Locale } from "@/lib/i18n";

export interface FaqItem {
  question: string;
  answer: string;
  links?: Array<{ text: string; href: string }>;
}

export interface ToolStep {
  title: string;
  description: string;
}

export interface RelatedTool {
  title: string;
  description: string;
  href: string;
  /** Illustration key — stays stable across locales, unlike `href`. */
  kind: PageKey;
}

export type PageKey = "home" | "video" | "gif" | "story";

export interface ToolPageContent {
  slug: PageKey;
  path: string;
  /** Owning locale; drives <div lang> and hreflang generation. */
  locale: Locale;
  /** Locale-correct path of the video tool, used by the home cross-link. */
  videoPath: string;
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  subtitle: string;
  placeholder: string;
  howToTitle: string;
  steps: [ToolStep, ToolStep, ToolStep];
  faq: FaqItem[];
  related: RelatedTool[];
}

const HOME_TOOL: RelatedTool = {
  title: "Pinterest Image Downloader",
  description: "Download Pinterest images and thumbnails in HD",
  href: "/",
  kind: "home",
};

const VIDEO_TOOL: RelatedTool = {
  title: "Pinterest Video Downloader",
  description: "Download Pinterest videos in HD",
  href: "/pinterest-video-downloader/",
  kind: "video",
};

const GIF_TOOL: RelatedTool = {
  title: "Pinterest GIF Downloader",
  description: "Save animated GIFs from Pinterest",
  href: "/pinterest-gif-downloader/",
  kind: "gif",
};

const STORY_TOOL: RelatedTool = {
  title: "Pinterest Story Downloader",
  description: "Download Pinterest Story Pins",
  href: "/pinterest-story-downloader/",
  kind: "story",
};

export const TOOL_PAGES: Record<ToolPageContent["slug"], ToolPageContent> = {
  home: {
    slug: "home",
    path: "/",
    locale: "en",
    videoPath: "/pinterest-video-downloader/",
    // Brand prefix dropped: it cost 13 chars that the target keyword needs up
    // front, and Google appends the site name to home-page titles anyway.
    seoTitle: "Free Pinterest Image Downloader — HD, No Watermark",
    metaDescription:
      "Download Pinterest images and thumbnails in original HD quality. Free, no login, no watermark. Supports JPG, PNG, GIF and WebP.",
    keywords: ["pinterest image downloader", "pinterest thumbnail download", "pinterest photo downloader"],
    h1: "Free Pinterest Image Downloader",
    subtitle:
      "Download any Pinterest image, thumbnail, GIF or video in original HD quality. No login, no watermark, 100% free.",
    placeholder: "Paste your Pinterest link here...",
    howToTitle: "How to Download Pinterest Images — 3 Easy Steps",
    steps: [
      {
        title: "Find an image on Pinterest",
        description:
          "Open Pinterest, find the image you want to save, and tap the Share button to copy its link.",
      },
      {
        title: "Paste the link into SavePinner",
        description:
          "Paste the copied link into the input box above and click the Download button.",
      },
      {
        title: "Download the original-quality image",
        description:
          "Choose your preferred size and download the image in HD quality. No compression, no watermark.",
      },
    ],
    faq: [
      {
        question: "How do I download Pinterest images without watermark?",
        answer:
          "All images downloaded through SavePinner are fetched directly from Pinterest's CDN in their original quality, without any watermark added by us.",
      },
      {
        question: "Can I download Pinterest thumbnails in full resolution?",
        answer:
          "Yes! By default Pinterest shows compressed thumbnails. Our Pinterest thumbnail downloader extracts the original image URL from Pinterest's CDN so you get the full resolution version.",
      },
      {
        question: "Does this Pinterest image downloader work on iPhone?",
        answer:
          "Yes, SavePinner works on all devices — iPhone, Android, iPad, and desktop. Simply paste the Pin link and download.",
      },
      {
        question: "Is it free to download Pinterest videos?",
        answer:
          "Yes, our Pinterest video downloader is completely free. Download videos in HD quality (up to 1080p) with no login required.",
        links: [{ text: "Pinterest video downloader", href: "/pinterest-video-downloader/" }],
      },
      {
        question: "What Pinterest link formats are supported?",
        answer:
          "We support pinterest.com/pin/ links, pin.it short links, and Pinterest country domains (co.uk, de, fr, jp, br, etc.).",
      },
      {
        question: "Will the downloaded image lose quality?",
        answer:
          "No. We fetch the original image from Pinterest's CDN (i.pinimg.com/originals/), so you get the exact same quality as uploaded.",
      },
      {
        question: "Can I download an entire Pinterest board at once?",
        answer:
          "Currently we support single Pin downloads. Board download is coming soon — stay tuned!",
      },
      {
        question: "Is SavePinner safe to use?",
        answer:
          "Yes. All downloads are served over HTTPS. We don't store your downloaded images or Pin links. No malware, no ads injection.",
      },
    ],
    related: [VIDEO_TOOL, GIF_TOOL, STORY_TOOL],
  },
  video: {
    slug: "video",
    path: "/pinterest-video-downloader/",
    locale: "en",
    videoPath: "/pinterest-video-downloader/",
    seoTitle: "Free Pinterest Video Downloader — Save HD Videos Online",
    metaDescription:
      "Download Pinterest videos in HD quality up to 1080p. Free, no login, no watermark. Works on iPhone, Android and desktop browsers.",
    keywords: ["pinterest video downloader"],
    h1: "Pinterest Video Downloader — Save Videos in HD",
    subtitle:
      "Download Pinterest videos in HD quality up to 1080p. No login, no watermark, 100% free.",
    placeholder: "Paste Pinterest video link here...",
    howToTitle: "How to Download Pinterest Videos — 3 Easy Steps",
    steps: [
      {
        title: "Find a Pinterest video",
        description: "Open the video Pin you want to save and copy its link from the Share menu.",
      },
      {
        title: "Paste the video link",
        description: "Paste the copied Pinterest video link above and click Download.",
      },
      {
        title: "Choose a video quality",
        description: "Select 1080P, 720P, 480P or 360P when that quality is available, then save the MP4 file.",
      },
    ],
    faq: [
      {
        question: "Can I download Pinterest videos on iPhone?",
        answer: "Yes. Copy the video Pin link, paste it into SavePinner in Safari, choose a quality, and download.",
      },
      {
        question: "Can I download Pinterest videos on Android?",
        answer: "Yes. SavePinner works in mobile browsers on Android without an app or account.",
      },
      {
        question: "What video qualities can I download?",
        answer: "SavePinner shows the qualities Pinterest provides for the Pin, including up to 1080P and lower available versions.",
      },
      {
        question: "Does the Pinterest video downloader add a watermark?",
        answer: "No. SavePinner streams the video file from Pinterest's CDN without adding a watermark.",
      },
      {
        question: "Is the Pinterest video downloader free?",
        answer: "Yes. It is free and requires no login or sign-up.",
      },
      {
        question: "Which Pinterest video links are supported?",
        answer: "Public pinterest.com/pin/ links, pin.it short links and Pinterest country-domain Pin links are supported.",
      },
    ],
    related: [HOME_TOOL, GIF_TOOL],
  },
  gif: {
    slug: "gif",
    path: "/pinterest-gif-downloader/",
    locale: "en",
    videoPath: "/pinterest-video-downloader/",
    seoTitle: "Pinterest GIF Downloader — Save Animated GIFs in HD",
    metaDescription:
      "Download animated GIFs from Pinterest in original quality. Free online Pinterest GIF downloader. No login, no watermark. Supports all animated content.",
    keywords: ["pinterest gif downloader"],
    h1: "Pinterest GIF Downloader — Save Animated GIFs",
    subtitle:
      "Download animated GIFs from Pinterest in original quality. No login, no watermark, 100% free.",
    placeholder: "Paste Pinterest GIF link here...",
    howToTitle: "How to Download Pinterest GIFs — 3 Easy Steps",
    steps: [
      {
        title: "Find an animated GIF",
        description: "Open the Pinterest GIF Pin you want to save and copy its link.",
      },
      {
        title: "Paste the GIF link",
        description: "Paste the copied link into SavePinner and click Download.",
      },
      {
        title: "Save the animated file",
        description: "Download the original-quality animated GIF directly to your device.",
      },
    ],
    faq: [
      {
        question: "How do I download an animated GIF from Pinterest?",
        answer: "Copy the public GIF Pin link, paste it above, and download the original animated file shown in the result.",
      },
      {
        question: "Will the downloaded Pinterest GIF stay animated?",
        answer: "Yes. When Pinterest provides a real GIF, SavePinner downloads the animated GIF file rather than a static thumbnail.",
      },
      {
        question: "Is this Pinterest GIF downloader free?",
        answer: "Yes. It is free and requires no registration or login.",
      },
      {
        question: "Does SavePinner add a watermark to GIFs?",
        answer: "No. SavePinner does not add a watermark to downloaded GIF files.",
      },
      {
        question: "Can I download Pinterest GIFs on mobile?",
        answer: "Yes. The Pinterest GIF downloader works on iPhone, Android, iPad and desktop browsers.",
      },
      {
        question: "What if a GIF Pin only returns an image?",
        answer: "SavePinner labels the media type it can extract. A static image is not presented as an animated GIF.",
      },
    ],
    related: [HOME_TOOL, VIDEO_TOOL, STORY_TOOL],
  },
  story: {
    slug: "story",
    path: "/pinterest-story-downloader/",
    locale: "en",
    videoPath: "/pinterest-video-downloader/",
    seoTitle: "Pinterest Story Downloader — Download Story Pins Online",
    metaDescription:
      "Download Pinterest Story Pins for free. Save stories in HD quality. No login required. Fast Pinterest story downloader tool.",
    keywords: ["pinterest story downloader"],
    h1: "Pinterest Story Downloader — Download Story Pins",
    subtitle:
      "Download Pinterest Story Pins in HD quality for free. No login or sign-up required.",
    placeholder: "Paste Pinterest Story Pin link here...",
    howToTitle: "How to Download Pinterest Story Pins — 3 Easy Steps",
    steps: [
      {
        title: "Open a Pinterest Story Pin",
        description: "Find the public Story Pin you want to save and copy its link from Share.",
      },
      {
        title: "Paste the Story Pin link",
        description: "Paste the copied link above and click the Download button.",
      },
      {
        title: "Download the story",
        description: "Choose an available HD video quality and save the Story Pin to your device.",
      },
    ],
    faq: [
      {
        question: "How do I download a Pinterest Story Pin?",
        answer: "Copy the public Story Pin link, paste it above, and choose an available download quality.",
      },
      {
        question: "Are Pinterest Story Pins downloaded as video?",
        answer: "Story Pins with downloadable video are returned as video files with the available quality options.",
      },
      {
        question: "Can I download Pinterest Story Pins on iPhone?",
        answer: "Yes. SavePinner works in Safari and other modern mobile browsers without an app.",
      },
      {
        question: "Is the Pinterest Story downloader free?",
        answer: "Yes. It is free and does not require an account or login.",
      },
      {
        question: "Does SavePinner store downloaded stories?",
        answer: "No. Downloaded media and pasted Pin links are not stored by SavePinner.",
      },
      {
        question: "Which Story Pin links are supported?",
        answer: "Public Pinterest Pin links, pin.it short links and country-domain Pin links are supported.",
      },
    ],
    related: [HOME_TOOL, VIDEO_TOOL, GIF_TOOL],
  },
};

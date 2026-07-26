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

/**
 * Prose block rendered between the How-to steps and the FAQ.
 *
 * Only the device pages use this. They target the same tool as the home page
 * from a different angle, so without genuinely device-specific material they
 * would be near-duplicates of it — which is worse for the site than not
 * publishing them at all. Everything here has to be something a visitor on
 * that device actually needs to know.
 */
export interface GuideSection {
  heading: string;
  body: string[];
  bullets?: string[];
}

export type PageKey = "home" | "video" | "gif" | "story" | "iphone" | "android";

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
  /** Device pages only — see GuideSection. */
  sections?: GuideSection[];
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

const IPHONE_TOOL: RelatedTool = {
  title: "Pinterest Downloader for iPhone",
  description: "Save Pins to your Camera Roll on iOS",
  href: "/pinterest-downloader-iphone/",
  kind: "iphone",
};

const ANDROID_TOOL: RelatedTool = {
  title: "Pinterest Downloader for Android",
  description: "Save Pins to your gallery, no app needed",
  href: "/pinterest-downloader-android/",
  kind: "android",
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
    related: [VIDEO_TOOL, GIF_TOOL, STORY_TOOL, IPHONE_TOOL, ANDROID_TOOL],
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
    related: [HOME_TOOL, GIF_TOOL, IPHONE_TOOL, ANDROID_TOOL],
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
  iphone: {
    slug: "iphone",
    path: "/pinterest-downloader-iphone/",
    locale: "en",
    videoPath: "/pinterest-video-downloader/",
    seoTitle: "Pinterest Downloader for iPhone — Save Pins in HD",
    metaDescription:
      "Download Pinterest images and videos on iPhone straight from Safari. No app, no login, no watermark — plus how to get them into Photos.",
    keywords: [
      "pinterest downloader iphone",
      "download pinterest images on iphone",
      "save pinterest video to iphone",
    ],
    h1: "Pinterest Downloader for iPhone",
    subtitle:
      "Save any Pinterest image or video to your iPhone straight from Safari. No app to install, no login, no watermark.",
    placeholder: "Paste your Pinterest link here...",
    howToTitle: "How to Download Pinterest Images on iPhone — 3 Steps",
    steps: [
      {
        title: "Copy the Pin link in the Pinterest app",
        description:
          "Open the Pin, tap the share arrow, then tap Copy Link. Pinterest puts a pin.it short link on your clipboard, which works here as-is.",
      },
      {
        title: "Paste it into Safari",
        description:
          "Come back to this page in Safari and tap Paste, or long-press the box and choose Paste. iOS may ask permission to read the clipboard the first time.",
      },
      {
        title: "Save it to Photos",
        description:
          "Long-press the result image and choose Add to Photos to put it straight in your Camera Roll, or tap Download to send it to the Files app.",
      },
    ],
    sections: [
      {
        heading: "Where iPhone downloads actually go",
        body: [
          "This is the step that catches most people out. When you tap a download button in Safari, iOS does not put the file in Photos — it hands it to the Safari download manager, which saves it into the Downloads folder of the Files app. Your Camera Roll looks unchanged, and it is easy to conclude the download failed when it did not.",
          "To move a file from Files into Photos, open the Files app, tap Downloads, tap the file, then tap the share icon and choose Save Image or Save Video. From that point it behaves like any other photo — it syncs to iCloud, appears in Recents, and can be edited.",
        ],
        bullets: [
          "Files app → Browse → On My iPhone → Downloads is the default location.",
          "You can change it in Settings → Safari → Downloads if you would rather use iCloud Drive.",
          "Images saved with Add to Photos skip Files entirely and land in the Camera Roll directly.",
        ],
      },
      {
        heading: "Saving straight to your Camera Roll",
        body: [
          "For images there is a shortcut worth knowing: once the result appears above, press and hold it. Safari shows a menu with Add to Photos, which writes the full-resolution file into your Camera Roll in one step, no Files detour.",
          "Videos do not offer Add to Photos from a long-press. Use the Download button, then move the MP4 across from Files as described above. It is one extra tap, and it is the only reliable route on iOS.",
        ],
      },
      {
        heading: "Which iPhone browsers this works in",
        body: [
          "Safari, Chrome, Firefox and Edge on iPhone all handle these downloads the same way, because downloading and long-press saving are provided by iOS rather than by the browser. If a download behaves oddly in one of them, switching to Safari is the quickest thing to try.",
          "Private Browsing works too. Nothing here depends on being signed in to Pinterest, so a private tab downloads exactly the same file.",
        ],
      },
      {
        heading: "You do not need an app for this",
        body: [
          "Searches for a Pinterest downloader on iPhone often lead to App Store listings or configuration profiles. You do not need either. Apple does not allow apps whose main purpose is downloading media from other services, so listings that claim to do it tend to be short-lived, ad-heavy, or quietly doing something else.",
          "A browser page has no access to your photos, contacts or location, cannot run in the background, and disappears the moment you close the tab. For a task you might do a few times a month, that is a far better trade than installing something.",
        ],
      },
      {
        heading: "What you can and cannot save",
        body: [
          "Anything on a public Pin works: images, videos, GIFs and the individual pages of a slideshow Idea Pin. If you can open the Pin in a browser without signing in, it can be saved here.",
          "Some Pins cannot be reached, and it is worth knowing which before you assume something is broken. Pins on secret boards, Pins from accounts set to private, and Pins that Pinterest has taken down are all invisible to anything that is not signed in as you — including this page. Pinterest also puts a sign-in wall in front of some Pins depending on region and traffic, and those return an error rather than a file.",
          "Saving a Pin does not change who owns it. Downloading someone's photograph for a private moodboard is a very different thing from republishing it, and the second one is the creator's decision to make, not yours.",
        ],
        bullets: [
          "Public Pin, public board — works.",
          "Secret board or private account — not reachable without your login.",
          "Deleted Pin — gone; the link will error rather than return an old copy.",
        ],
      },
    ],
    faq: [
      {
        question: "Why can't I find my Pinterest download on my iPhone?",
        answer:
          "It is almost certainly in the Files app rather than Photos. Open Files, tap Downloads, and it will be there. Tap it, then use the share icon and Save Image or Save Video to move it into your Camera Roll.",
      },
      {
        question: "How do I save a Pinterest image straight to my Camera Roll?",
        answer:
          "Press and hold the result image and choose Add to Photos. That writes the full-resolution file into your Camera Roll in one step, without going through the Files app.",
      },
      {
        question: "Can I download Pinterest videos on iPhone?",
        answer:
          "Yes. Paste the video Pin link, pick a quality, and tap Download. The MP4 goes to the Files app; open it there and choose Save Video to move it into Photos.",
        links: [{ text: "Pinterest video downloader", href: "/pinterest-video-downloader/" }],
      },
      {
        question: "Do I need to install an app?",
        answer:
          "No. This runs entirely in Safari or any other iPhone browser. There is nothing to install and no configuration profile to trust.",
      },
      {
        question: "Does this work on iPad too?",
        answer:
          "Yes. iPadOS uses the same download manager and the same long-press menu, so every step on this page applies unchanged.",
      },
      {
        question: "Why won't the Paste button work?",
        answer:
          "iOS asks permission before a website may read your clipboard. If you dismissed that prompt, long-press the input box and choose Paste instead — that always works.",
      },
      {
        question: "Will the image lose quality on iPhone?",
        answer:
          "No. The file is fetched from Pinterest's own CDN at its original resolution, and neither Safari nor Photos re-compresses it on the way in.",
      },
    ],
    related: [HOME_TOOL, VIDEO_TOOL, ANDROID_TOOL],
  },
  android: {
    slug: "android",
    path: "/pinterest-downloader-android/",
    locale: "en",
    videoPath: "/pinterest-video-downloader/",
    seoTitle: "Pinterest Downloader for Android — No App Needed",
    metaDescription:
      "Download Pinterest images and videos on Android from any browser. No APK, no login, no watermark. Works on Chrome, Samsung Internet and Firefox.",
    keywords: [
      "pinterest downloader android",
      "download pinterest images on android",
      "pinterest video download android",
    ],
    h1: "Pinterest Downloader for Android",
    subtitle:
      "Save any Pinterest image or video on Android from the browser you already use. No APK to sideload, no login, no watermark.",
    placeholder: "Paste your Pinterest link here...",
    howToTitle: "How to Download Pinterest Images on Android — 3 Steps",
    steps: [
      {
        title: "Copy the Pin link",
        description:
          "In the Pinterest app, open the Pin, tap the share icon and choose Copy Link. A pin.it short link is fine — it is resolved for you.",
      },
      {
        title: "Paste it into your browser",
        description:
          "Open this page in Chrome, Samsung Internet or Firefox and tap Paste, or long-press the input box and choose Paste from the menu.",
      },
      {
        title: "Tap Download",
        description:
          "The file goes to your Downloads folder and, for images and videos, shows up in Gallery or Google Photos within a few seconds.",
      },
    ],
    sections: [
      {
        heading: "Where Android saves the file",
        body: [
          "Android is more straightforward than iOS here. Whatever browser you use, downloads land in the shared Downloads folder on internal storage, and you can reach them through Files, My Files on Samsung devices, or the Downloads shortcut in the browser's own menu.",
          "Images and videos are also picked up by the system media scanner, which is what makes them appear in Gallery or Google Photos alongside your camera shots. That usually happens within a few seconds. If a file has not shown up, opening it once from the Downloads folder reliably prompts the scan.",
        ],
        bullets: [
          "Chrome: tap the three-dot menu → Downloads.",
          "Samsung Internet: menu → Downloads, or the My Files app → Internal storage → Download.",
          "Firefox: menu → Downloads.",
        ],
      },
      {
        heading: "Saving without leaving the page",
        body: [
          "You do not have to use the Download button. Once the result appears above, press and hold the image and choose Download image from the browser menu — it saves the same full-resolution file and skips a step.",
          "For videos, use the Download button so you can pick a quality first. Android will hand the MP4 to your Downloads folder and notify you when it finishes, and it plays in any gallery app from there.",
        ],
      },
      {
        heading: "Please don't sideload an APK for this",
        body: [
          "Searches for a Pinterest downloader on Android turn up a lot of APK files hosted outside the Play Store. Installing one means granting a stranger's binary permission to read your storage and run in the background, permanently, for a task that takes one tab and thirty seconds. Media downloaders are a well-known distribution route for adware and worse, precisely because people looking for them are willing to bypass the Play Store.",
          "A web page cannot do any of that. It has no storage permission beyond the file you explicitly save, no background access, and it is gone when you close the tab. If a site tells you that you must install its app to download a Pin, close it.",
        ],
      },
      {
        heading: "Which Android browsers work",
        body: [
          "Chrome, Samsung Internet, Firefox, Edge, Brave and Opera all work, and so do the built-in browsers on most manufacturer skins. Downloading is handled by Android's own download manager, so behaviour barely differs between them.",
          "Incognito and private tabs work as well. Nothing here needs a Pinterest login, so a private tab gets exactly the same file as a normal one.",
        ],
      },
      {
        heading: "Sending downloads to an SD card",
        body: [
          "If your phone has expandable storage and you save a lot of Pins, it is worth pointing downloads at the card rather than internal storage. In Chrome this lives under the three-dot menu, then Settings, then Downloads, where you can switch the download location and optionally have it ask you each time. Samsung Internet has the same setting under its own Downloads menu.",
          "One caveat: some gallery apps only index internal storage by default, so images saved to a card may not appear in Gallery until you point the app at that folder. If the file matters more than the convenience, internal storage is the simpler choice.",
        ],
      },
      {
        heading: "What you can and cannot save",
        body: [
          "Any public Pin works — images, videos, GIFs, and the individual pages of a slideshow Idea Pin. If the Pin opens in a browser without asking you to sign in, it can be saved here.",
          "Some Pins are out of reach no matter which tool you use. Pins on secret boards, Pins belonging to private accounts, and Pins that have been deleted are not visible to anything that is not signed in as you. Pinterest also shows a sign-in wall on some Pins depending on region and traffic; those come back as an error rather than a file, which is the honest outcome.",
          "Downloading a Pin does not transfer any rights to it. Saving someone's work for your own reference is ordinary use; republishing it as your own is not, and that call belongs to whoever made it.",
        ],
        bullets: [
          "Public Pin, public board — works.",
          "Secret board or private account — not reachable without your login.",
          "Deleted Pin — gone; you get an error, not an old copy.",
        ],
      },
    ],
    faq: [
      {
        question: "Where do Pinterest downloads go on Android?",
        answer:
          "Into the shared Downloads folder on internal storage. You can open them from your browser's Downloads list, or through Files and My Files. Images and videos also appear in Gallery or Google Photos once the media scanner picks them up.",
      },
      {
        question: "Do I need to install an app or APK?",
        answer:
          "No, and you should not. This works entirely in your browser. Sideloaded downloader APKs ask for broad, permanent storage and background permissions for something a single browser tab does safely.",
      },
      {
        question: "Can I download Pinterest videos on Android?",
        answer:
          "Yes. Paste the video Pin link, choose the quality you want, and tap Download. The MP4 saves to Downloads and plays in any gallery app.",
        links: [{ text: "Pinterest video downloader", href: "/pinterest-video-downloader/" }],
      },
      {
        question: "The image didn't appear in my gallery — where is it?",
        answer:
          "It is in your Downloads folder. Android's media scanner usually adds it to Gallery within seconds; opening the file once from Downloads forces the scan if it has not happened.",
      },
      {
        question: "Does this work on Samsung phones?",
        answer:
          "Yes. Samsung Internet is fully supported, and downloads land in Internal storage → Download, which you can browse in the My Files app.",
      },
      {
        question: "Will Pinterest know I downloaded the Pin?",
        answer:
          "No. You are never signed in here, and the Pin is fetched without any account attached, so nothing is recorded against your Pinterest profile.",
      },
      {
        question: "Does it work on a tablet or Chromebook?",
        answer:
          "Yes. Android tablets behave exactly like phones, and on a Chromebook the file lands in the Downloads folder of the Files app.",
      },
    ],
    related: [HOME_TOOL, VIDEO_TOOL, IPHONE_TOOL],
  },
};

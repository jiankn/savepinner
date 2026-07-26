import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SavePinner",
    short_name: "SavePinner",
    description: "Free Pinterest image, video, GIF and thumbnail downloader. No login and no watermark.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#e60023",
    icons: [
      { src: "/icons/savepinner-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/savepinner-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}

/** Shared resolver contract. Dependency-free and safe for Client Components. */

export type MediaKind = "image" | "gif" | "video";

export interface ResolvedVariant {
  quality: string;
  url: string;
  ext: string;
  width?: number;
  height?: number;
}

export interface ResolvedMedia {
  type: MediaKind;
  title: string;
  thumbnail: string;
  variants: ResolvedVariant[];
}

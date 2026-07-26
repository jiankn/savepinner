/** Shared resolver contract. Dependency-free and safe for Client Components. */

export type MediaKind = "image" | "gif" | "video";

export interface ResolvedVariant {
  quality: string;
  url: string;
  ext: string;
  width?: number;
  height?: number;
}

/** One page of a multi-page Idea Pin, downloadable on its own. */
export interface ResolvedPage {
  /** 1-based position inside the Idea Pin. */
  index: number;
  kind: "image" | "video";
  url: string;
  ext: string;
  quality?: string;
  width?: number;
  height?: number;
  /** Small preview for the row; may be absent for image pages. */
  thumbnail?: string;
}

export interface ResolvedMedia {
  type: MediaKind;
  title: string;
  thumbnail: string;
  variants: ResolvedVariant[];
  /**
   * Individual pages of an Idea Pin, present only when it has more than one.
   * `type`/`variants` still describe the cover, which is what most people
   * want; this exposes the slides the cover cannot represent.
   */
  pages?: ResolvedPage[];
}

export interface DownloadAvailability {
  /** True when the shared daily download budget is (nearly) exhausted. */
  capped: boolean;
  /** Epoch ms when the daily budget resets (next UTC midnight). */
  resetAt: number;
}

/** Wire shape of POST /api/resolve/ success responses. */
export interface ResolveResponse extends ResolvedMedia {
  /** Optional so older clients and tests without the field keep working. */
  download?: DownloadAvailability;
}

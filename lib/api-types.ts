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

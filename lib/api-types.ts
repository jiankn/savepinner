/**
 * Shared API contract types — PRD §7.1. Dependency-free; safe for client
 * components to import.
 */

export type MediaKind = "image" | "gif" | "video";

export interface ResolveVariant {
  id: string;
  label: string;
  format: string;
  width?: number;
  height?: number;
  bytes?: number;
  downloadToken: string;
}

export interface ResolveSuccess {
  requestId: string;
  type: MediaKind;
  title?: string;
  previewUrl?: string;
  variants: ResolveVariant[];
}

export interface ResolveErrorBody {
  requestId: string;
  error: { code: string; message: string };
}

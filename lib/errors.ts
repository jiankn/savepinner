/**
 * Standard error model — PRD §6.4 (FR-008).
 * `message` is the user-facing English copy shown by the frontend; internal
 * causes are logged but never exposed in responses.
 */

export type ErrorCode =
  | "INVALID_URL"
  | "UNSUPPORTED_URL"
  | "REDIRECT_REJECTED"
  | "PIN_NOT_PUBLIC"
  | "MEDIA_NOT_FOUND"
  | "UNSUPPORTED_MEDIA"
  | "RATE_LIMITED"
  | "DAILY_CAP_REACHED"
  | "UPSTREAM_BLOCKED"
  | "RESOLVE_TIMEOUT"
  | "INTERNAL_ERROR"
  | "TOKEN_INVALID"
  | "TOKEN_EXPIRED"
  | "FILE_TOO_LARGE";

interface ErrorDef {
  status: number;
  message: string;
}

export const ERROR_DEFS: Record<ErrorCode, ErrorDef> = {
  INVALID_URL: { status: 400, message: "Please enter a valid Pinterest Pin link." },
  UNSUPPORTED_URL: { status: 400, message: "This type of Pinterest page is not supported yet." },
  REDIRECT_REJECTED: { status: 400, message: "The short link redirected to an unsupported address." },
  PIN_NOT_PUBLIC: { status: 403, message: "This content is not publicly accessible." },
  MEDIA_NOT_FOUND: { status: 404, message: "No downloadable media file was found for this Pin." },
  UNSUPPORTED_MEDIA: { status: 422, message: "This media type is not supported yet." },
  RATE_LIMITED: { status: 429, message: "Too many requests — please try again in a moment." },
  DAILY_CAP_REACHED: {
    status: 429,
    message:
      "Today's one-click downloads are used up — they reset at midnight UTC. You can still open the file directly from Pinterest's CDN and save it manually.",
  },
  UPSTREAM_BLOCKED: { status: 502, message: "The source content is temporarily unreachable. Please try again later." },
  RESOLVE_TIMEOUT: { status: 504, message: "The request timed out. Please try again." },
  INTERNAL_ERROR: { status: 500, message: "The service is temporarily unavailable." },
  TOKEN_INVALID: { status: 403, message: "This download link is invalid." },
  TOKEN_EXPIRED: { status: 403, message: "This download link has expired. Please resolve the Pin again." },
  FILE_TOO_LARGE: { status: 413, message: "The file exceeds the maximum supported size." },
};

export class ApiError extends Error {
  readonly code: ErrorCode;
  readonly status: number;
  readonly userMessage: string;
  /** Internal-only detail for logs; never sent to clients. */
  readonly internal?: string;

  constructor(code: ErrorCode, internal?: string) {
    const def = ERROR_DEFS[code];
    super(def.message);
    this.name = "ApiError";
    this.code = code;
    this.status = def.status;
    this.userMessage = def.message;
    this.internal = internal;
  }
}

export function isApiError(err: unknown): err is ApiError {
  return err instanceof ApiError;
}

/** Maps any thrown value to a safe, client-facing error response body. */
export function toErrorResponse(err: unknown, requestId: string): { body: ErrorBody; status: number; code: ErrorCode } {
  const apiErr = isApiError(err) ? err : new ApiError("INTERNAL_ERROR", err instanceof Error ? err.message : String(err));
  return {
    status: apiErr.status,
    code: apiErr.code,
    body: {
      requestId,
      error: { code: apiErr.code, message: apiErr.userMessage },
    },
  };
}

export interface ErrorBody {
  requestId: string;
  error: { code: ErrorCode; message: string };
}

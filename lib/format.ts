/**
 * Small dependency-free formatting helpers shared by client components.
 * Must stay free of Node.js imports.
 */

export function formatBytes(bytes: number | undefined): string {
  if (bytes === undefined || !Number.isFinite(bytes) || bytes < 0) return "—";
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let value = bytes;
  let unit = "B";
  for (const next of units) {
    if (value < 1024) break;
    value /= 1024;
    unit = next;
  }
  return `${value >= 100 ? Math.round(value) : value.toFixed(1)} ${unit}`;
}

/** Coarse "resets in 3h 24m" countdown text; never shows seconds. */
export function formatEta(msFromNow: number): string {
  const totalMinutes = Math.ceil(Math.max(0, msFromNow) / 60_000);
  if (totalMinutes < 1) return "under a minute";
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) return `${minutes}m`;
  return minutes === 0 ? `${hours}h` : `${hours}h ${minutes}m`;
}

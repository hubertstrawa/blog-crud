export const PUBLIC_BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";
const INTERNAL_BACKEND_URL =
  process.env.INTERNAL_BACKEND_URL ?? PUBLIC_BACKEND_URL;

export const BACKEND_URL =
  typeof window === "undefined" ? INTERNAL_BACKEND_URL : PUBLIC_BACKEND_URL;
export const DEFAULT_PAGE_SIZE = 12;

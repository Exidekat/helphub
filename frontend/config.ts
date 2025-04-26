/**
 * config.ts
 *
 * This file exports configuration constants for the frontend.
 * It reads the META_URL from the environment variable VITE_META_URL.
 * If VITE_META_URL is not defined or is blank, it defaults to "/api".
 *
 * It also exports MOBILE_VER which is set to true if VITE_MOBILE_VER is "true".
 */
const metaUrl: string = import.meta.env.VITE_META_URL || "";
export const BASE_API_URL = metaUrl.trim() !== "" ? metaUrl : "/api";
export const MOBILE_VER = import.meta.env.VITE_MOBILE_VER === "true";

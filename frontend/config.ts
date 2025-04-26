/**
 * config.ts
 *
 * Exports configuration constants for the frontend.
 *
 * - BASE_API_URL is "/api" unless VITE_META_URL is set.
 * - MOBILE_VER is true if VITE_MOBILE_VER === "true".
 * - API_BASE defaults to BASE_API_URL, but you can override via VITE_API_BASE.
 */

export const siteConfig = {
    name: "HelpHub",
    description: "QR-powered emergency assistance and community resources at your fingertips.",
    mainNav: [
      {
        title: "Home",
        href: "/",
      },
      {
        title: "Features",
        href: "/#features",
      },
      {
        title: "How It Works",
        href: "/#how-it-works",
      },
      {
        title: "About",
        href: "/#about",
      },
    ],
  }

const metaUrl: string = import.meta.env.VITE_META_URL || '';
export const BASE_API_URL = metaUrl.trim() !== '' ? metaUrl : '/api';
export const MOBILE_VER = import.meta.env.VITE_MOBILE_VER === 'true';

// Use BASE_API_URL by default (always relative), override only if env var provided.
export const API_BASE = import.meta.env.VITE_API_BASE || BASE_API_URL;

// site/capacitor.config.ts
import type { CapacitorConfig } from '@capacitor/cli';

/**
 * Capacitor configuration for the HelpHub mobile app.
 *
 * The webDir points to the directory containing the built web assets.
 * In this project, the Vite build outputs assets to "backend/public".
 * Ensure that you run your build (e.g. "bun run build") before running "bun cap sync".
 */
const config: CapacitorConfig = {
    appId: 'com.woc.helphub',
    appName: 'HelpHub',
    webDir: 'backend/public'
};

export default config;

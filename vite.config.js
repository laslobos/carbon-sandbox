// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));
export default defineConfig(async ({ command, mode }) => {
    let transformPlugin = null;
    let manualStorePlugin = null;
    const isDev = command === 'serve' || mode === 'development';
    console.log(`[Vite Config] Command: ${command}, Mode: ${mode}, isDev: ${isDev}`);
    // Only load and apply the preprocessor for development
    if (isDev) {
      // Saves manual accessibility checklist comments / resolved state (dev only)
      const { a11yManualStore } = await import('./scripts/a11y-manual-plugin.mjs');
      manualStorePlugin = a11yManualStore(__dirname);
      // Optional, local-only: IBM's accessibility-preprocessor adds source-location
      // attributes used by the Bob accessibility MCP scan. It is not in package.json
      // (it is hosted on a private IBM network), so install it locally with:
      //   npm install --no-save https://mcp.acs.dal.app.cirrus.ibm.com/MCP/resources/accessibility-preprocessor
      // Without it the dev server, `npm run a11y:scan` and the status panel work unchanged.
      try {
          const { transformVitePlugin } = await import('accessibility-preprocessor');
          transformPlugin = await transformVitePlugin(__dirname);
          console.log('✓ Accessibility preprocessor loaded successfully');
      } catch (error) {
          if (error?.code === 'ERR_MODULE_NOT_FOUND') {
              console.log('[Vite Config] accessibility-preprocessor not installed (optional) - skipping');
          } else {
              console.error("Failed to load accessibility-preprocessor:", error);
          }
      }
    }
    return {
        optimizeDeps: {
            force: mode === 'development'
        },
        plugins: [
            // 1. preprocessor runs first (dev only)
            ...(transformPlugin ? [{
                ...transformPlugin,
                enforce: 'pre',
                apply: 'serve',
            }] : []),
            // 2. React plugin runs after
            react(),
            ...(manualStorePlugin ? [manualStorePlugin] : [])
        ],
        server: {
            port: 3000,
            open: true,
            // Saving a checklist comment must not trigger a page reload
            watch: { ignored: ['**/src/a11y/manual/**'] }
        }
    };
});
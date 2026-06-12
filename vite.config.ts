import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

// Cloudflare Pages serves /company.html at /company; mirror that in the dev server.
const prettyUrls = () => ({
  name: 'pretty-html-urls',
  configureServer(server: {middlewares: {use: (fn: (req: {url?: string}, res: unknown, next: () => void) => void) => void}}) {
    const pages = ['/company', '/compliance', '/prop28', '/builder'];
    server.middlewares.use((req, _res, next) => {
      const url = req.url?.split('?')[0];
      if (url && pages.includes(url)) req.url = url + '.html';
      next();
    });
  },
});

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss(), prettyUrls()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          company: path.resolve(__dirname, 'company.html'),
          compliance: path.resolve(__dirname, 'compliance.html'),
          prop28: path.resolve(__dirname, 'prop28.html'),
          builder: path.resolve(__dirname, 'builder.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});

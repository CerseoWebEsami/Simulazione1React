import { defineConfig } from 'vite';

// Configurazione minimale di Vite.
// esbuild (integrato in Vite) trasforma automaticamente i file .jsx,
// quindi non serve il plugin React per far girare questo progetto.
// Nei componenti importiamo React esplicitamente (runtime "classico").
export default defineConfig({
  esbuild: {
    jsx: 'automatic',
  },
});

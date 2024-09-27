import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import tailwindcss from 'tailwindcss';
import { defineConfig, type PluginOption } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'what-is-new',
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'tailwindcss'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          tailwindcss: 'tailwindcss'
        }
      }
    },
    sourcemap: true,
    emptyOutDir: true
  },
  plugins: [
    react(),
    dts({ rollupTypes: true }),
    visualizer({ filename: 'bundle-visualizer.html' }) as unknown as PluginOption
  ],
  css: {
    postcss: {
      plugins: [tailwindcss]
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    globalSetup: './src/test/globals.ts',
    setupFiles: './src/test/setup.ts',
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    css: true,
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        // Default values
        'coverage/**',
        'dist/**',
        '**/[.]**',
        'packages/*/test?(s)/**',
        '**/*.d.ts',
        '**/virtual:*',
        '**/__x00__*',
        '**/\x00*',
        'cypress/**',
        'test?(s)/**',
        'test?(-*).?(c|m)[jt]s?(x)',
        '**/*{.,-}{test,spec}.?(c|m)[jt]s?(x)',
        '**/__tests__/**',
        '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
        '**/vitest.{workspace,projects}.[jt]s?(on)',
        '**/.{eslint,mocha,prettier}rc.{?(c|m)js,yml}',
        // Custom values
        '**/mocks/**',
        '**/types/**',
        '**/api.ts',
        'src/api/**/hooks.ts',
        'src/apiFront/**/hooks.ts',
        'src/apiGitlab/**/hooks.ts',
        'src/apiInfra/**/hooks.ts',
        'src/apiTracker/**/hooks.ts',
        'html/assets',
        'config/jest',
        '**/*.stories.[jt]s?(x)',
        '**/*.stories.mdx',
        '**/constants/**',
        '**/__temporary__/**',
        '**/legacy/**'
      ]
    },
    reporters: ['default', 'verbose', 'junit', 'json', 'html'],
    outputFile: {
      junit: './junit-report.xml',
      json: './json-report.json'
    }
  }
});

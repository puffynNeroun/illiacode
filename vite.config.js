import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        outDir: 'dist',
        emptyOutDir: true,
    },
    server: {
        open: true,
        port: 5173,
    },
    resolve: {
        alias: {
            '@': '/src',
        },
    },
});
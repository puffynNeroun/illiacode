import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    base: './', // Убедитесь, что используется относительный путь
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'), // Укажите путь к вашему `index.html`
            },
        },
    },
    server: {
        open: true,
        port: 5173,
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
});

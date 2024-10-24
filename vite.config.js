import { defineConfig } from 'vite';

export default defineConfig({
    base: '/illiacode/', // Убедитесь, что 'illiacode' заменено на название вашего репозитория
    build: {
        outDir: 'dist', // Указывает, где будут сохраняться собранные файлы
        emptyOutDir: true,
    },
    server: {
        open: true, // Автоматически открывает браузер при запуске
        port: 5173,
    },
    resolve: {
        alias: {
            '@': '/src', // Удобные пути к файлам внутри src
        },
    },
});

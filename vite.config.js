import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/loginStyle.css', 'resources/js/login.js'],
            refresh: true,
        }),
    ],
});

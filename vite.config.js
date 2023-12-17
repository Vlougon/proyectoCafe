import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/loginStyle.css', 
                'resources/css/teacherSheetsStyle.css', 
                'resources/css/departmentStyle.css', 
                'resources/css/managerStudy.css', 
                'resources/css/classRooms.css', 
                'resources/css/dashboard.css', 
                'resources/css/userForm.css', 
                'resources/js/login.js', 
                'resources/js/teachersSheet.js', 
                'resources/js/departament.js',
                'resources/js/managerStudy.js',
                'resources/js/classRooms.js', 
                'resources/js/dashboard.js', 
                'resources/js/userForm.js', 
            ],
            refresh: true,
        }),
    ],
});

<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('auth.login');
})->name('home')->middleware('guest');

Route::get('teacherSheets/{id?}', function (?string $id = null) {
    return view('html.teacherSheets');
})->middleware('auth');

Route::get('departament', function (?string $id = null) {
    return view('html.departament');
})->middleware('auth');
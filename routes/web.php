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

Route::get('teacherSheets', function () {
    return view('html.teacherSheets');
})->middleware('auth');

Route::get('teacherSheets/{id}', function (string $id) {
    return view('html.teacherSheets');
})->middleware('auth')->middleware('can:viewDepartment,App\Models\User');

Route::get('departament', function () {
    return view('html.departament');
})->middleware('auth')->middleware('can:viewDepartment,App\Models\User');

Route::get('departament/{id}', function (string $id) {
    return view('html.departament');
})->middleware('auth')->middleware('can:viewStudy,App\Models\User');

Route::get('studyManager', function () {
    return view('html.managerStudy');
})->middleware('auth')->middleware('can:viewStudy,App\Models\User');
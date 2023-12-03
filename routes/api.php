<?php

use App\Http\Controllers\Api\V1\AulaController;
use App\Http\Controllers\Api\V1\CursoController;
use App\Http\Controllers\Api\V1\EspecialidadController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\ModuloController;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\Auth\LoginRegisterController;
use Illuminate\Cache\Repository;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(LoginRegisterController::class)->group(function () {
    Route::post('register', 'register');
    Route::post('login', 'login');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [LoginRegisterController::class, 'logout']);

    Route::prefix('V1')->group(function () {
        Route::apiResource('modulos', ModuloController::class)
        ->missing(function (Request $request) {
            return response()->json("No se encontró el modulo indicado", 404);
        });
        Route::apiResource('especialidades', EspecialidadController::class)
        ->missing(function (Request $request) {
            return response()->json("No se encontró la especialidad indicada", 404);
        });
        Route::apiResource('users', UserController::class)
        ->missing(function (Request $request) {
            return response()->json("No se encontró el Usuario indicado", 404);
        });
        Route::apiResource('cursos', CursoController::class)
        ->missing(function (Request $request) {
            return response()->json("No se encontró el Curso indicado", 404);
        });
        Route::apiResource('aulas', AulaController::class)
        ->missing(function (Request $request) {
            return response()->json("No se encontró el Aula indicado", 404);
        });

        Route::get('/especialidad/{especialidadId}/modulos',[EspecialidadController::class, 'obtenerModulosPorEspecialidad'] )
        ->missing(function (Request $request) {
            return response()->json("No se encontró la especialidad indicada con sus modulos", 404);
        });
        Route::get('/especialidad/{especialidadId}/users',[EspecialidadController::class, 'obtenerUsersPorEspecialidad'] )
        ->missing(function (Request $request) {
            return response()->json("No se encontró la especialidad indicada con sus users", 404);
        });
        Route::get('/curso/{cursoId}/modulos',[CursoController::class, 'obtenerModulosPorCurso'] )
        ->missing(function (Request $request) {
            return response()->json("No se encontró el curso indicada con sus modulos", 404);
        });

    });
});





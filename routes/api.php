<?php

use App\Http\Controllers\Api\V1\EspecialidadController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\ModuloController;
use App\Http\Controllers\Auth\LoginRegisterController;
use App\Models\Especialidad;
use App\Models\Modulo;
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
        Route::get('/especialidad/{especialidadId}/modulos',[EspecialidadController::class, 'obtenerModulosPorEspecialidad'] )
        ->missing(function (Request $request) {
            return response()->json("No se encontró la especialidad indicada con sus modulos", 404);
        });
    });
});

Route::get('/especialidades/{especialidadId}', function ($especialidadId) {
    // Encuentra la especialidad por su ID
    $especialidad = Especialidad::with('modulos')->find($especialidadId);

    if (!$especialidad) {
        return response()->json(['message' => 'Especialidad no encontrada'], 404);
    }

    // Obtiene los IDs de los módulos asociados a esta especialidad
    $modulosIds = $especialidad->modulos->pluck('id');

    return response()->json(['especialidad' => $especialidad, 'modulos_ids' => $modulosIds]);
});



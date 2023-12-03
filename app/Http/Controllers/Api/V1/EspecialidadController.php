<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Especialidad;
use Illuminate\Http\Request;
use App\Http\Requests\EspecialidadForm;
use App\Http\Resources\EspecialidadResource;



class EspecialidadController extends Controller
{

    public function obtenerModulosPorEspecialidad($especialidadId)
    {
        // Encuentra la especialidad por su ID
        $especialidad = Especialidad::with('modulos')->find($especialidadId);

        if (!$especialidad) {
            return response()->json(['message' => 'Especialidad no encontrada'], 404);
        }

        // Obtiene los IDs de los módulos asociados a esta especialidad
        $modulosIds = $especialidad->modulos->pluck('id');

        return response()->json(['especialidad' => $especialidad]);
    }

    public function obtenerUsersPorEspecialidad($especialidadId)
    {
        // Encuentra la especialidad por su ID
        $especialidad = Especialidad::with('users')->find($especialidadId);

        if (!$especialidad) {
            return response()->json(['message' => 'Especialidad no encontrada'], 404);
        }

        // Obtiene los IDs de los módulos asociados a esta especialidad
        $modulosIds = $especialidad->modulos->pluck('id');

        return response()->json(['especialidad' => $especialidad]);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $especialidades = EspecialidadResource::collection(Especialidad::latest()->get());

        if (is_null($especialidades->first())) {
            return response()->json([
                'status' => 'failed',
                'message' => '¡No hay Especialidades que enseñar!',
            ], 200);
        }

        $response = [
            'status' => 'success',
            'message' => '¡Se ha conseguido extraer las Especialidades!.',
            'data' => $especialidades,
        ];

        return response()->json($response, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EspecialidadForm $request)
    {
        $especialidades = Especialidad::create($request->all());

        $response = [
            'status' => 'success',
            'message' => '¡Se ha agregado la Especialidad!',
            'data' => new EspecialidadResource($especialidades),
        ];

        return response()->json($response, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Especialidad $especialidad)
    {
        if (is_null($especialidad)) {
            return response()->json([
                'status' => 'failed',
                'message' => '¡No se ha encontrado la especialidad!',
            ], 200);
        }


        $response = [
            'status' => 'success',
            'message' => '¡Se ha encontrado la especialidad!',
            'data' => new EspecialidadResource($especialidad),
        ];

        return response()->json($response, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EspecialidadForm $request, Especialidad $especialidad)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Especialidad $especialidad)
    {
        //
    }
}

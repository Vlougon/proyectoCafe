<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\AulaResource;
use App\Models\Aula;
use Illuminate\Http\Request;

class AulaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $aulas = AulaResource::collection(Aula::latest()->get());

        if (is_null($aulas->first())) {
            return response()->json([
                'status' => 'failed',
                'message' => '¡No hay Especialidades que enseñar!',
            ], 200);
        }

        $response = [
            'status' => 'success',
            'message' => '¡Se ha conseguido extraer las Especialidades!.',
            'data' => $aulas,
        ];

        return response()->json($response, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $especialidades = Aula::create($request->all());

        $response = [
            'status' => 'success',
            'message' => '¡Se ha agregado la Especialidad!',
            'data' => new AulaResource($especialidades),
        ];

        return response()->json($response, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Aula $aula)
    {
        if (is_null($aula)) {
            return response()->json([
                'status' => 'failed',
                'message' => '¡No se ha encontrado la especialidad!',
            ], 200);
        }


        $response = [
            'status' => 'success',
            'message' => '¡Se ha encontrado la especialidad!',
            'data' => new AulaResource($aula),
        ];

        return response()->json($response, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Aula $aula)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Aula $aula)
    {
        //
    }
}

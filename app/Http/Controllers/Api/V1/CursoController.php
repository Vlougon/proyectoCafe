<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\CursoResource;
use App\Models\Curso;
use Illuminate\Http\Request;

class CursoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cursos = CursoResource::collection(Curso::latest()->get());

        if (is_null($cursos->first())) {
            return response()->json([
                'status' => 'failed',
                'message' => '¡No hay Cursos que enseñar!',
            ], 200);
        }

        $response = [
            'status' => 'success',
            'message' => '¡Se ha conseguido extraer los cursos!.',
            'data' => $cursos,
        ];

        return response()->json($response, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $cursos = Curso::create($request->all());

        $response = [
            'status' => 'success',
            'message' => '¡Se ha agregado el curso!',
            'data' => new CursoResource($cursos),
        ];

        return response()->json($response, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Curso $curso)
    {
        if (is_null($curso)) {
            return response()->json([
                'status' => 'failed',
                'message' => '¡No se ha encontrado el Curso Indicado!',
            ], 200);
        }

        $response = [
            'status' => 'success',
            'message' => '¡Se ha encontrado el Curso!',
            'data' => new CursoResource($curso),
        ];

        return response()->json($response, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Curso $curso)
    {
        if (is_null($curso)) {
            return response()->json([
                'status' => 'failed',
                'message' => '¡No se ha encontrado el Curso Indicado!',
            ], 200);
        }

        $curso->update($request->all());

        $response = [
            'status' => 'success',
            'message' => '¡Se ha actualizaod exitosamente el Modulo!',
            'data' => new CursoResource($curso),
        ];

        return response()->json($response, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Curso $curso)
    {
        if (is_null($curso)) {
            return response()->json([
                'status' => 'failed',
                'message' => '¡No se ha encontrado el modulo Indicado!',
            ], 200);
        }

        $curso->delete();
        return response()->json([
            'status' => 'success',
            'message' => '¡Se ha eliminado el Modulo seleccionado!'
        ], 200);
    }
}

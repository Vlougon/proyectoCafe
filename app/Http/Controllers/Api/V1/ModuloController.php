<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Modulo;
use Illuminate\Http\Request;
use App\Http\Requests\ModuloForm;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\ModuloResource;

class ModuloController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $modulos = ModuloResource::collection(Modulo::latest()->get());

        if (is_null($modulos->first())) {
            return response()->json([
                'status' => 'failed',
                'message' => '¡No hay Modulos que enseñar!',
            ], 200);
        }

        $response = [
            'status' => 'success',
            'message' => '¡Se ha conseguido extraer los modulos!.',
            'data' => $modulos,
        ];

        return response()->json($response, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ModuloForm $request)
    {
        // if ($request->fails()) {
        //     return response()->json([
        //         'status' => 'failed',
        //         'message' => '¡No se ha podido validar el formulario! No se creará el modulo.',
        //         'data' => $request->errors(),
        //     ], 403);
        // }

        $modulos = Modulo::create($request->all());

        $response = [
            'status' => 'success',
            'message' => '¡Se ha agregado el curso!',
            'data' => new ModuloResource($modulos),
        ];

        return response()->json($response, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Modulo $modulo)
    {
        if (is_null($modulo)) {
            return response()->json([
                'status' => 'failed',
                'message' => '¡No se ha encontrado el modulo Indicado!',
            ], 200);
        }

        $response = [
            'status' => 'success',
            'message' => '¡Se ha encontrado el modulo!',
            'data' => new ModuloResource($modulo),
        ];

        return response()->json($response, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Modulo $modulo)
    {
        if (is_null($modulo)) {
            return response()->json([
                'status' => 'failed',
                'message' => '¡No se ha encontrado el modulo Indicado!',
            ], 200);
        }

        // $validate = Validator::make($request->all(), [

        // ]);

        // if ($validate->fails()) {
        //     return response()->json([
        //         'status' => 'failed',
        //         'message' => '¡No se ha podido validar el formulario! No se actualizarán los datos.',
        //         'data' => $validate->errors(),
        //     ], 403);
        // }

        $modulo->update($request->all());

        $response = [
            'status' => 'success',
            'message' => '¡Se ha actualizaod exitosamente el Modulo!',
            'data' => new ModuloResource($modulo),
        ];

        return response()->json($response, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Modulo $modulo)
    {
        if (is_null($modulo)) {
            return response()->json([
                'status' => 'failed',
                'message' => '¡No se ha encontrado el modulo Indicado!',
            ], 200);
        }

        $modulo->delete();
        return response()->json([
            'status' => 'success',
            'message' => '¡Se ha eliminado el Modulo seleccionado!'
        ], 200);
    }
}

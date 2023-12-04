<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Aula_Modulo_Form;
use App\Http\Resources\Aula_Modulo_Resource;
use App\Models\Aula_Modulo;
use Illuminate\Http\Request;

class Aula_Modulo_Controller extends Controller
{
    public function index()
    {
        $aula_modulos = Aula_Modulo_Resource::collection(Aula_Modulo::latest()->get());

        if (is_null($aula_modulos->first())) {
            return response()->json([
                'status' => 'failed',
                'message' => '¡No hay Modulas para la Aula que enseñar!',
            ], 200);
        }

        $response = [
            'status' => 'success',
            'message' => '¡Se ha conseguido extraer los Modulas para la Aula!.',
            'data' => $aula_modulos,
        ];

        return response()->json($response, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Aula_Modulo_Form $request)
    {
        $aula_modulos = Aula_Modulo::create($request->all());

        $response = [
            'status' => 'success',
            'message' => '¡Se ha agregado la Especialidad!',
            'data' => new Aula_Modulo_Resource($aula_modulos),
        ];

        return response()->json($response, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Aula_Modulo $aula_modulos)
    {
        if (is_null($aula_modulos)) {
            return response()->json([
                'status' => 'failed',
                'message' => '¡No se ha encontrado la especialidad!',
            ], 200);
        }


        $response = [
            'status' => 'success',
            'message' => '¡Se ha encontrado la especialidad!',
            'data' => new Aula_Modulo_Resource($aula_modulos),
        ];

        return response()->json($response, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Aula_Modulo $aula_Modulo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Aula_Modulo $aula_Modulo)
    {
        //
    }
}

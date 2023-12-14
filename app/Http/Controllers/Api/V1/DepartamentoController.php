<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\DepartamentoResource;
use App\Models\Departamento;
use App\Models\Especialidad;
use App\Models\User;
use Illuminate\Http\Request;

class DepartamentoController extends Controller
{

    public function obtenerUsuariosPorDepartamentoYEstado($departamentoID)
    {

        // Filtrar usuarios por departamento_id y schedule_status = 'sent'
        $usuarios = User::select(
            'users.id as id',
            'users.name as name',
            'users.total_hours as total_hours',
            'especialidades.name as nombre_especialidad',
            'departamentos.id as id_departamento',
            'departamentos.name as nombre_departamento'

        )
            ->join('especialidades', 'users.especialidad_id', '=', 'especialidades.id')
            ->join('departamentos', 'users.departamento_id', '=', 'departamentos.id')
            ->where('users.departamento_id', $departamentoID)
            ->where('users.schedule_status', 'sent')
            ->get();

            $departamento = Departamento::where('id', $departamentoID)->get();

            $response = [
                'status' => 'success',
                'data' => $usuarios,
                'departamento' => $departamento
            ];


        // Aquí retornas los resultados (puedes enviarlos a la vista o hacer otra acción con ellos)
        return response()->json($response);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $departamentos = DepartamentoResource::collection(Departamento::latest()->get());

        if (is_null($departamentos->first())) {
            return response()->json([
                'status' => 'failed',
                'message' => '¡No hay Modulos que enseñar!',
            ], 200);
        }

        $response = [
            'status' => 'success',
            'message' => '¡Se ha conseguido extraer los modulos!.',
            'data' => $departamentos,
        ];

        return response()->json($response, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Departamento $departamento)
    {
        if (is_null($departamento)) {
            return response()->json([
                'status' => 'failed',
                'message' => '¡No se ha encontrado el departamento!',
            ], 200);
        }

        $response = [
            'status' => 'success',
            'message' => '¡Se ha encontrado la especialidad!',
            'data' => new DepartamentoResource($departamento),
        ];

        return response()->json($response, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Departamento $departamento)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Departamento $departamento)
    {
        //
    }
}

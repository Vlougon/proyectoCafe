<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\AulaModuloForm;
use App\Http\Resources\AulaModuloResource;
use App\Models\Aula;
use App\Models\AulaModulo;
use App\Models\Modulo;
use Illuminate\Http\Request;

class AulaModuloController extends Controller
{

    public function obtenerModulosPorAula($aulaId)
    {
        // Encuentra el aula por su ID
        $aula = Aula::with('modulos')->find($aulaId);

        if (!$aula) {
            return response()->json(['message' => 'Aula no encontrada'], 404);
        }

        return response()->json(['aula' => $aula]);
    }

    public function obtenerAulasPorModulo($moduloId)
    {
        // Encuentra el aula por su ID
        $modulo = Modulo::with('aulas')->find($moduloId);

        if (!$modulo) {
            return response()->json(['message' => 'Modulo no encontrada'], 404);
        }

        return response()->json(['modulo' => $modulo]);
    }

    public function index()
    {
        $aulaModulos = AulaModulo::latest()->get();

        if (is_null($aulaModulos->first())) {
            return response()->json([
                'status' => 'failed',
                'message' => '¡No hay Aulas por Modulos que mostrar!',
            ], 404);
        }

        $response = [
            'status' => 'success',
            'message' => '¡Se ha conseguido extraer las Aulas Por Modulos!.',
            'data' => AulaModuloResource::collection($aulaModulos),
        ];

        return response()->json($response, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AulaModuloForm $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(AulaModulo $aula_modulos)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AulaModulo $AulaModulo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AulaModulo $AulaModulo)
    {
        //
    }

    public function getClassHoursByTurn()
    {
        $classroomsByTurn = Aula::join('aula_modulo', 'aulas.id', '=', 'aula_modulo.aula_id')
            ->join('modulos', 'aula_modulo.modulo_id', '=', 'modulos.id')
            ->join('cursos', 'modulos.curso_id', '=', 'cursos.id')
            ->select('name', Modulo::raw('sum(hours_per_week) as scheudleLoad'), 'turn')
            ->groupBy('name', 'turn')
            ->get();

        // select('name', Aula::raw('count(name) as count'))->groupBy('name')->get();

        if (is_null($classroomsByTurn->first())) {
            return response()->json([
                'status' => 'failed',
                'message' => '¡No hay Aulas por Modulos que mostrar!',
            ], 404);
        }

        $response = [
            'status' => 'success',
            'message' => '¡Se ha conseguido extraer las Aulas Por Modulos!.',
            'data' => $classroomsByTurn,
        ];

        return response()->json($response, 200);
    }

    // public function getClassHoursInMorning()
    // {
    //     $classroomsByTurn = Aula::join('aula_modulo', 'aulas.id', '=', 'aula_modulo.aula_id')
    //         ->join('modulos', 'aula_modulo.modulo_id', '=', 'modulos.id')
    //         ->join('cursos', 'modulos.curso_id', '=', 'cursos.id')
    //         ->select('name', Modulo::raw('sum(hours_per_week) as scheudleLoad'))
    //         ->where('turn', '=', 'M')
    //         ->groupBy('name')
    //         ->get();

    //     // select('name', Aula::raw('count(name) as count'))->groupBy('name')->get();

    //     if (is_null($classroomsByTurn->first())) {
    //         return response()->json([
    //             'status' => 'failed',
    //             'message' => '¡No hay Aulas por Modulos que mostrar!',
    //         ], 404);
    //     }

    //     $response = [
    //         'status' => 'success',
    //         'message' => '¡Se ha conseguido extraer las Aulas Por Modulos!.',
    //         'data' => $classroomsByTurn,
    //     ];

    //     return response()->json($response, 200);
    // }

    // public function getClassHoursInEvening()
    // {
    //     $classroomsByTurn = Aula::join('aula_modulo', 'aulas.id', '=', 'aula_modulo.aula_id')
    //         ->join('modulos', 'aula_modulo.modulo_id', '=', 'modulos.id')
    //         ->join('cursos', 'modulos.curso_id', '=', 'cursos.id')
    //         ->select('name', Modulo::raw('sum(hours_per_week) as scheudleLoad'), 'turn')
    //         ->where('turn', '=', 'T')
    //         ->groupBy('name', 'turn')
    //         ->get();

    //     // select('name', Aula::raw('count(name) as count'))->groupBy('name')->get();

    //     if (is_null($classroomsByTurn->first())) {
    //         return response()->json([
    //             'status' => 'failed',
    //             'message' => '¡No hay Aulas por Modulos que mostrar!',
    //         ], 404);
    //     }

    //     $response = [
    //         'status' => 'success',
    //         'message' => '¡Se ha conseguido extraer las Aulas Por Modulos!.',
    //         'data' => $classroomsByTurn,
    //     ];

    //     return response()->json($response, 200);
    // }
}

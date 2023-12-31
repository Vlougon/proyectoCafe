<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserForm;
use App\Http\Resources\UserResource;
use App\Models\Especialidad;
use App\Models\User;
use Illuminate\Http\Request;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //Guardamos la coleccion de Usuarios
        $users = UserResource::collection(User::latest()->get());
        if (is_null($users->first())) {
            return response()->json([
                'status' => 'failes',
                'message' => ' !User no encontrado¡'
            ], 200);
        }

        $response = [
            'status' => 'success',
            'message' => '¡Se ha encontrado el User!',
            'data' => $users,
        ];

        return response()->json($response, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserForm $request)
    {
        $users = User::create($request->all());

        $response = [
            'status' => 'success',
            'message' => 'Se ha crado el User correctamente.',
            'data' => new UserResource($users),
        ];

        return response()->json($response, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        if (is_null($user)) {
            return response()->json([
                'status' => 'failed',
                'message' => '¡No se ha encontrado el modulo Indicado!',
            ], 200);
        }

        $response = [
            'status' => 'success',
            'message' => '¡Se ha encontrado el User!',
            'data' => new UserResource($user),
        ];

        return response()->json($response, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserForm $request, User $user)
    {
        if (is_null($user)) {
            return response()->json([
                'status' => 'failed',
                'message' => '¡No se ha encontrado el usuario Indicado!',
            ], 200);
        }

        $user->update($request->all());

        $response = [
            'status' => 'success',
            'message' => '¡Se ha actualizado exitosamente el Usuario!',
            'data' => new UserResource($user),
        ];

        return response()->json($response, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $user = User::find($id)->delete();

        $response = [
            'status' => 'success',
            'message' => '¡Se ha borrado exitosamente el Usuario!',
            'data' => $user,
        ];

        return response()->json($response, 200);
    }


    public function partialUpdate(Request $request, User $user)
    {
        if (is_null($user)) {
            return response()->json([
                'status' => 'failed',
                'message' => '¡No se ha encontrado el usuario Indicado!',
            ], 200);
        }

        $user->update($request->all());

        $response = [
            'status' => 'success',
            'message' => '¡Se ha actualizado exitosamente el Usuario!',
            'data' => new UserResource($user),
        ];

        return response()->json($response, 200);
    }
}

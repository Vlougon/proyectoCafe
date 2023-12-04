<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\AulaResource;
use App\Http\Resources\ModuloResource;


class Aula_Modulo_Resource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'aula' =>  AulaResource::collection($this->aulas),
            'modulo' =>  ModuloResource::collection($this->modulos),
        ];
    }
}

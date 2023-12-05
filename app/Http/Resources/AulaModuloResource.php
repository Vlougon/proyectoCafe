<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\AulaResource;
use App\Http\Resources\ModuloResource;


class AulaModuloResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'aula' => new  AulaResource($this->aulas),
            
            'modulo' =>  new ModuloResource($this->modulos),
        ];
    }
}

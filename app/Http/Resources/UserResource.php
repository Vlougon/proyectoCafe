<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'email_verified_at' => $this->email_verified_at,
            'rol' => $this->rol,
            'total_hours' => $this->total_hours,
            'schedule_status' => $this->schedule_status,
            'observatioins' => $this->observatioins,
            'profile_picture' => $this->profile_picture,
            'especialidad_id' => new EspecialidadResource($this->especialidad),
            'departamento_id' => new DepartamentoResource($this->departamento),
            'remember_token' => $this->remember_token,
        ];
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\EspecialidadResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ModuloResource extends JsonResource
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
            'code' => $this->code,
            'subject' => $this->subject,
            'hours_per_week' => $this->hours_per_week,
            'total_hours' => $this->total_hours,
            'weekly_distribution' => $this->weekly_distribution,
            'classroom' => $this->classroom,
            'user_id' => new UserResource($this->user_id),
            'especialidad_id' => new EspecialidadResource($this->especialidad),
            'curso_id' => new CursoResource($this->curso_id),
        ];
    }
}

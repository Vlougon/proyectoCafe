<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Modulo extends Model
{
    use HasFactory;

    protected $fillable = [
        'codigo',
        'materia',
        'h_semanales',
        'h_totales',
        'user_id',
        'especialidad_id',
        'curso_id'
    ];

    public function especialidad() {
        return $this->belongsTo(Especialidad::class);
    }

    public function curso() {
        return $this->belongsTo(Curso::class);
    }

    public function aula() {
        return $this->belongsTo(Aula::class);
    }

}

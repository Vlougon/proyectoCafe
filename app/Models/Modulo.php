<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Modulo extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'subject',
        'hours_per_week',
        'total_hours',
        'weekly_distribution',
        'classroom',
        'user_id',
        'especialidad_id',
        'curso_id',
    ];

    public function especialidad() {
        return $this->belongsTo(Especialidad::class);
    }

    public function curso() {
        return $this->belongsTo(Curso::class);
    }

    public function aulas() {
        return $this->belongsToMany(Aula::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

}

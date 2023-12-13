<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AulaModulo extends Model
{
    use HasFactory;
    protected $table = 'aula_modulo';
    protected $fillable = [
        'aula_id',
        'modulo_id',
    ];

    public function aulas() {
        return $this->belongsTo(Aula::class, 'aula_id');
    }

    public function modulos() {
        return $this->belongsTo(Modulo::class, 'modulo_id');
    }
}
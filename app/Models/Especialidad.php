<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Especialidad extends Model
{
    use HasFactory;

    protected $table = 'especialidades';

    protected $fillable = [
        'nombre',
        'modulos'
    ];

    public function modulos() //Relación 1:N
    {
        return $this->hasMany(Modulo::class);
    }
}

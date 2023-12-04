<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Aula_Modulo extends Model
{
    use HasFactory;
    protected $table = 'aula_modulos';
    protected $fillable = [
        'aula_id',
        'modulo_id',
    ];


}
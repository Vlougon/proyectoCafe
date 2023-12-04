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


}
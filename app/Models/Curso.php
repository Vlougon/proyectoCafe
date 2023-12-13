<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Curso extends Model
{
    use HasFactory;

    protected $fillable = [
        'course',
        'turn',
    ];

    public function modulos(){
        return $this->hasMany(Modulo::class);
    }
}

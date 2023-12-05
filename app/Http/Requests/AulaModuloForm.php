<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AulaModuloForm extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'aula_id' => 'required|exists:aula,id',
            
            'modulo_id' => 'required|exists:modulo,id',
        ];
    }
}

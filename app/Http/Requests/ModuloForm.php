<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ModuloForm extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'codigo' => 'required|string',

            'materia' => 'required|string',

            'h_semanales' => 'required|integer',

            'h_totales' => 'required|integer',

            'user_id' => 'required|integer',

            'especialidad_id' => 'required|integer',
            
            'curso_id' => 'required|integer'
        ];
    }
}

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
            'code' => 'required|string|max:255',
            
            'subject' => 'required|string|max:255',
            
            'hours_per_week' => 'required|integer|min:0|max:255',
            
            'total_hours' => 'required|integer|min:0|max:255',
            
            'especialidad_id' => 'required|exists:especialidades,id',
            
            'curso_id' => 'required|exists:cursos,id'
        ];
    }
}

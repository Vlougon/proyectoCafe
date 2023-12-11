<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserForm extends FormRequest
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
            'name' => 'required|string|max:255',

            'email' => 'required|email|max:255',

            'total_hours' => 'required|string',

            'schedule_status' => 'required|string',

            'observatioins' => 'required|string',

            'rol' => 'required|in:teacher,head_of_department,study_manager',

            'especialidad_id' => 'required|exists:especialidades,id',
            
            'departamento_id' => 'required|exists:departamentos,id',
        ];
    }
}

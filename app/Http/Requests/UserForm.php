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

            'email' => 'required|email|unique:users,email|max:255',

            'password' => 'required|string|min:8',

            'rol' => 'required|in:teacher,head_of_department,study_manager',

            'especialidad_id' => 'required|exists:especialidades,id',
            
            'departamento_id' => 'required|exists:departamentos,id',
        ];
    }
}

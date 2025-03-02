<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMedicalServiceRequest extends FormRequest
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
            'name' => 'string|max:255',
            'description' => 'string',
            'category' => 'string|max:255',
            'thumbnail' => 'file|mine:jpeg,png,jpg',
            'price' => 'numeric',
            'duration' => 'numeric',
            'status' => 'string|max:255',
            'specialist_required' => 'required',
            'preparation_instruction' => 'string',
            'doctor_ids' => 'sometimes|array',
        ];
    }
}

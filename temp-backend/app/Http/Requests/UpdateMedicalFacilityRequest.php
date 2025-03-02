<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMedicalFacilityRequest extends FormRequest
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
            'facility_name' => 'string|max:255',
            'address' => 'string|max:255',
            'description' => 'nullable|string',
            'status' => 'boolean',
            'website' => 'nullable|url',
            'tax_code' => 'nullable|string|max:50',
            'thumbnail' => 'nullable|file|mimes:jpg,jpeg,png',
            'medical_practice_license' => 'nullable|string|max:255',
            'bussiness_registration_certificate' => 'nullable|string|max:255',
        ];
    }
}

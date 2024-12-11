<?php

namespace App\Http\Requests\Auth;

use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use Illuminate\Validation\Rules;

class RegisterRequest extends FormRequest {
    public function authorize(): bool {
        return true;
    }

    public function rules(): array {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            // 'gender' => ['required', 'string', 'in:male,female'],
            // 'phone_number' => ['required', 'string', 'max:15', 'unique:'.User::class],
            // 'date_of_birth' => ['required', 'date', 'before:today'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ];
    }
}




<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\HealthProfile;
use App\Models\role\Doctor;
use App\Models\role\Facility;

use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use App\Http\Requests\Auth\RegisterRequest;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(RegisterRequest $request): \Illuminate\Http\JsonResponse
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->string('password')),
            'role' => $request->role,
        ]);

        switch ($user->role) {
            case 'patient':
                HealthProfile::create([
                    'user_id' => $user->id,
                    'name' => $user->name,
                    'relationship' => 'self',
                    'gender' => 'male',
                    'height' => 0,
                    'weight' => 0,
                    'date_of_birth' => now(),
                    'allergies' => null,
                    'chronic_diseases' => null,
                    'medical_insurance_number' => null,
                ]);
                break;
            case 'doctor':
                Doctor::create([
                    'user_id' => $user->id,
                    'address' => $request->address,
                ]);
                break;
            case 'facility':
                Facility::create([
                    'user_id' => $user->id,
                    'address' => $request->address,
                ]);
                break;
        }
        event(new Registered($user));

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }
}

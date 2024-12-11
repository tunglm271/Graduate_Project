<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Js;

class AuthenticateTokenController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): JsonResponse
    {
        $user = $request->authenticate();

        // $request->session()->regenerate();
        $token = $user->createToken('login-token')->plainTextToken;
        return response()->json(['token' => $token]);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): Response
    {
        Auth::guard('web')->logout();    
        $user = auth()->user();
        $user->currentAccessToken()->delete();
        return response()->noContent();
    }
}

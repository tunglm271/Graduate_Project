<?php

use GuzzleHttp\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticateTokenController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('logout', [AuthenticatedSessionController::class, 'destroy']);
});


Route::get('', function () {
    return 'Hello World';
});

Route::post('/tokens/create', function (Request $request) {
    $token = $request->user()->createToken($request->token_name);
 
    return ['token' => $token->plainTextToken];
});

Route::post('login', [AuthenticateTokenController::class, 'store']);
Route::post('logout', [AuthenticateTokenController::class, 'destroy']);
Route::post('register', [RegisteredUserController::class, 'store']);


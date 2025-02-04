<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticateTokenController;
use App\Http\Controllers\reference\AllegryController;
use App\Http\Controllers\HealthProfileController;
use App\Http\Controllers\reference\DiseaseController;
use App\Http\Controllers\MedicineController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('medicines', [MedicineController::class, 'index']);
    Route::get('allegries', [AllegryController::class, 'getAllergies']);
    Route::get('diseases', [DiseaseController::class, 'getDiseases']);

    Route::prefix('health-profiles')->group(function () {
        Route::post('', [HealthProfileController::class, 'create']);
        Route::get('', [HealthProfileController::class, 'index']);
        Route::get('{id}', [HealthProfileController::class, 'show']);
        Route::put('{id}', [HealthProfileController::class, 'update']);
        Route::delete('{id}', [HealthProfileController::class, 'destroy']);
    });

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


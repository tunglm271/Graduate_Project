<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MedicalServiceController;
use App\Http\Controllers\MedicalFacilityController;
use App\Http\Controllers\HealthProfileController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\ChatController;
// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::apiResource('medical-facilities', MedicalFacilityController::class)->except('store');
    Route::post('/send-message', [ChatController::class, 'sendMessage']);
    Route::apiResource('doctors', DoctorController::class);
    Route::apiResource('patients', PatientController::class)->except('store');
    Route::apiResource('schedules', ScheduleController::class);
    Route::apiResource('medical-services', MedicalServiceController::class);
    Route::apiResource('health-profiles', HealthProfileController::class);

    Route::get('/get-messages', [ChatController::class, 'getMessages']);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

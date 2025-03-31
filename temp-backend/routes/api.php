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
use App\Http\Controllers\DiseaseController;
use App\Http\Controllers\AllergyController;
use App\Http\Controllers\MedicineController;
use App\Http\Controllers\AppointmentController;

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::apiResource('medical-facilities', MedicalFacilityController::class)->except('store');
    Route::get('my-facility', [MedicalFacilityController::class, 'detail']);
    Route::apiResource('doctors', DoctorController::class);
    Route::get("doctor/schedule", [DoctorController::class, 'getDoctorSchedule']);
    Route::apiResource('patients', PatientController::class)->except('store');
    Route::apiResource('schedules', ScheduleController::class);
    Route::apiResource('medical-services', MedicalServiceController::class);
    Route::get('service/valiable-slots', [MedicalServiceController::class, 'getAvaliableSlots']);
    Route::get('my-medical-services', [MedicalServiceController::class, 'indexByFacility']);
    Route::apiResource('health-profiles', HealthProfileController::class);
    Route::get('diseases', [DiseaseController::class, 'index']);
    Route::get('allergies', [AllergyController::class, 'index']);
    Route::get('medicines', [MedicineController::class, 'index']);
    Route::apiResource('appointments', AppointmentController::class)->except('update');
    Route::get('appointment/facility', [AppointmentController::class, 'indexByFacility']);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');




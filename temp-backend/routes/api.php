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
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\IndicatorController;

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('user', [AuthController::class, 'getUser']);
    Route::post('user/update', [AuthController::class, 'updateUser']);
    Route::apiResource('medical-facilities', MedicalFacilityController::class)->except('store');
    Route::get('my-facility', [MedicalFacilityController::class, 'detail']);
    Route::apiResource('doctors', DoctorController::class);
    Route::get("doctor/schedule", [DoctorController::class, 'getDoctorSchedule']);
    Route::apiResource('patients', PatientController::class)->except('store');
    Route::get('patient/doctor', [PatientController::class, 'indexByDoctor']);
    Route::apiResource('schedules', ScheduleController::class);
    Route::apiResource('medical-services', MedicalServiceController::class);
    Route::get('service/valiable-slots', [MedicalServiceController::class, 'getAvaliableSlots']);
    Route::get('service/doctors', [MedicalServiceController::class, 'getDoctorsForAppointment']);
    Route::get('my-medical-services', [MedicalServiceController::class, 'indexByFacility']);
    Route::apiResource('health-profiles', HealthProfileController::class);
    Route::get('diseases', [DiseaseController::class, 'index']);
    Route::get('allergies', [AllergyController::class, 'index']);
    Route::get('medicines', [MedicineController::class, 'index']);
    Route::get('indicator-types', [IndicatorController::class, 'getIndicatorTypes']);
    Route::apiResource('appointments', AppointmentController::class)->except('update');
    Route::post('appointment/assign-doctor', [AppointmentController::class, 'assignDoctor']);
    Route::get('appointment/facility', [AppointmentController::class, 'indexByFacility']);
    Route::get('appointment/doctor', [AppointmentController::class, 'indexByDoctor']);
    Route::get('vnpay_payment', [TransactionController::class, 'vnpay_payment']);
    Route::post('appointments/{appointmentId}/vnpay_verify_payment', [TransactionController::class, 'verifyPayment']);
    Route::get('appointments/{appointmentId}/bill', [TransactionController::class, 'showBill']);
    Route::post('appointments/{appointmentId}/add-result', [AppointmentController::class, 'addResult']);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');




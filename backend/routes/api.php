<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticateTokenController;
use App\Http\Controllers\Auth\FacilityVerificationController;
use App\Http\Controllers\Facility\ServiceController;
use App\Http\Controllers\Admin\UserManageController;
use App\Http\Controllers\reference\AllegryController;
use App\Http\Controllers\HealthProfileController;
use App\Http\Controllers\reference\DiseaseController;
use App\Http\Controllers\MedicineController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('medicines', [MedicineController::class, 'index']);
    Route::get('allergies', [AllegryController::class, 'getAllergies']);
    Route::get('chronic-diseases', [DiseaseController::class, 'getDiseases']);

    Route::prefix('health-profiles')->group(function () {
        Route::post('', [HealthProfileController::class, 'create'])->middleware('role:patient');
        Route::get('', [HealthProfileController::class, 'index']);
        Route::get('{id}', [HealthProfileController::class, 'showDetail'])->middleware('role:patient');
        Route::put('{id}', [HealthProfileController::class, 'update'])->middleware('role:patient');
        Route::delete('{id}', [HealthProfileController::class, 'destroy'])->middleware('role:patient');
    });

    Route::prefix('admin')->group(function () {
        Route::get('users', [UserManageController::class, 'viewAllUsers']);
        Route::post('approve-facility/{facilityId}', [UserManageController::class, 'approveFacility']);
        Route::post('reject-facility/{facilityId}', [UserManageController::class, 'rejectFacility']);
    });

    Route::prefix('facility')->group(function () {
        Route::post('upload-documents', [FacilityVerificationController::class, 'uploadDocuments']);
        Route::get('{id}/services', [ServiceController::class, 'getServices']);
        Route::post('{id}/services', [ServiceController::class, 'addService']);
        Route::put('{id}/services/{serviceId}', [ServiceController::class, 'updateService']);
        Route::delete('{id}/services/{serviceId}', [ServiceController::class, 'removeService']);
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


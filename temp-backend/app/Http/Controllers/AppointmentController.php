<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Http\Requests\StoreAppointmentRequest;
use App\Http\Requests\UpdateAppointmentRequest;
use App\Models\MedicalService;
use Illuminate\Http\Request;
class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function indexByFacility(Request $request)
    {
        return $request->user()->medicalFacility->appointments()->with('healthProfile')->get();
    }


    public function store(StoreAppointmentRequest $request)
    {
        $fields = $request->validated();
        $facility = MedicalService::find($fields['medical_service_id'])->medicalFacility;
        Appointment::create([
            'medical_service_id' => $fields['medical_service_id'],
            'health_profile_id' => $fields['health_profile_id'],
            'facility_id' => $facility->id,
            'date' => $fields['date'],
            'start_time' => $fields['start_time'],
            'end_time' => $fields['end_time'],
            'reason' => $fields['reason'] ?? null,
            'status' => "pending",
        ]);

        return response()->json([
            'message' => 'Appointment created successfully',
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Appointment $appointment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAppointmentRequest $request, Appointment $appointment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Appointment $appointment)
    {
        //
    }
}

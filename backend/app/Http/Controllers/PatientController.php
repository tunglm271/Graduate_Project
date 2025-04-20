<?php

namespace App\Http\Controllers;

use App\Models\Role\Patient;
use App\Http\Requests\StorePatientRequest;
use App\Http\Requests\UpdatePatientRequest;
use Illuminate\Http\Request;
class PatientController extends Controller
{
    public function index(Request $request)
    {
        $facility = $request->user()->medicalFacility;
        if ($facility) {
            return $facility->patients;
        }
        return response()->json(['message' => 'Facility not found'], 404);
    }


    public function indexByDoctor(Request $request)
    {
        $doctor = $request->user()->doctor;
        if ($doctor) {
            return $doctor->patients;
        }
        return response()->json(['message' => 'Doctor not found'], 404);
    }

    public function show(Patient $patient)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePatientRequest $request, Patient $patient)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Patient $patient)
    {
        //
    }
}

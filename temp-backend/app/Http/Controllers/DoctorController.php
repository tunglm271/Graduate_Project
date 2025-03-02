<?php

namespace App\Http\Controllers;

use App\Models\Role\Doctor;
use App\Http\Requests\StoreDoctorRequest;
use App\Http\Requests\UpdateDoctorRequest;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use App\Mail\DoctorMail;

class DoctorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $facility_id = $request->user()->medicalFacility->id;
        return Doctor::where('medical_facility_id', $facility_id)->first();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDoctorRequest $request)
    {
        $fields = $request->validated();
        $random_password = Str::random(8);

        $doctor = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => bcrypt($random_password),
            'role_id' => 3,
        ]);

        $doctor->doctor()->create([
            'medical_facility_id' => $request->user()->medicalFacility->id,
            'specialization' => $fields['specialization'],
            'about' => $fields['about'] ?? null,
            'name' => $fields['name'],
            'phone ' => $fields['phone'] ?? null,
        ]);

        $data = [
            'facility' => $request->user()->medicalFacility->name,
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => $random_password,
        ];

        Mail::to($fields['email'])->send(new DoctorMail($data));

        return response()->json($doctor, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Doctor $doctor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDoctorRequest $request, Doctor $doctor)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Doctor $doctor)
    {
        //
    }
}

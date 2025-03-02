<?php

namespace App\Http\Controllers;

use App\Models\HealthProfile;
use App\Http\Requests\StoreHealthProfileRequest;
use App\Http\Requests\UpdateHealthProfileRequest;
use Illuminate\Http\Request;

class HealthProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $profiles = HealthProfile::where('patient_id', $request->user()->patient->id)->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreHealthProfileRequest $request)
    {
        
    }

    /**
     * Display the specified resource.
     */
    public function show(HealthProfile $healthProfile)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateHealthProfileRequest $request, HealthProfile $healthProfile)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HealthProfile $healthProfile)
    {
        //
    }
}

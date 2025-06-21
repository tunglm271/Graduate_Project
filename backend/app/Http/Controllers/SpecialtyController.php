<?php

namespace App\Http\Controllers;

use App\Models\Specialty;
use Illuminate\Http\Request;

class SpecialtyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $specialties = $request->user()->medicalFacility->specialties()->get();
        return response()->json($specialties);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $facilityId = $request->user()->medicalFacility->id;
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
        ]);

        $specialty = Specialty::create([
            'name' => $request->name,
            'description' => $request->description,
            'medical_facility_id' => $facilityId,
        ]);

        return response()->json($specialty, 201);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Specialty $specialty)
    {
        if ($request->user()->medicalFacility->id !== $specialty->medical_facility_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'is_active' => 'boolean',
        ]);

        $specialty->update([
            'name' => $request->name,
            'description' => $request->description,
            'is_active' => $request->is_active ?? $specialty->is_active,
        ]);

        return response()->json($specialty);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Specialty $specialty)
    {
        if ($request->user()->medicalFacility->id !== $specialty->medical_facility_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $specialty->delete();
        return response()->json(['message' => 'Specialty deleted successfully'], 204);
    }
}

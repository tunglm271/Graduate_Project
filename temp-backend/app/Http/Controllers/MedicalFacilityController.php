<?php

namespace App\Http\Controllers;

use App\Models\Role\MedicalFacility;
use App\Http\Requests\StoreMedicalFacilityRequest;
use Illuminate\Http\Request;
use App\Http\Requests\UpdateMedicalFacilityRequest;
use Gate;

class MedicalFacilityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $facilities = MedicalFacility::select('facility_name','address','phone')->get();
        
        return response()->json(MedicalFacility::all());
    }

    public function show(MedicalFacility $medicalFacility)
    {
        return response()->json($medicalFacility);
    }


    public function detail(Request $request) {
        $medicalFacility = $request->user()->medicalFacility;
        return response()->json($medicalFacility);
    }

    public function update(UpdateMedicalFacilityRequest $request, MedicalFacility $medicalFacility)
    {
        Gate::authorize('modify', $medicalFacility);
        $fields = $request->validated();
        if($request->hasFile('thumbnail')) {
            $fields['thumbnail'] = cloudinary()->upload($request->file('thumbnail')->getRealPath())->getSecurePath();
        }
        $medicalFacility->update($fields);
        return response()->json( $medicalFacility);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MedicalFacility $medicalFacility)
    {
        Gate::authorize('modify', $medicalFacility);
        $medicalFacility->delete();
        return response()->json(['message' => 'Medical Facility deleted successfully']);
    }
}

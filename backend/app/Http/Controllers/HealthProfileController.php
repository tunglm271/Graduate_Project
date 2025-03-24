<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateProfileRequest;
use App\Models\HealthProfile;
use Illuminate\Http\Request;
use Carbon\Carbon;

class HealthProfileController extends Controller
{

    public function index()
    {
        $userId = auth()->id();
        $healthProfiles = HealthProfile::where('user_id', $userId)->get();

        return response()->json($healthProfiles, 200);
    }

    public function showDetail($id)
    {
        $healthProfile = HealthProfile::find($id);
        if (!$healthProfile) {
            return response()->json(['message' => 'Health profile not found'], 404);
        }

        return response()->json($healthProfile, 200);
    }


    public function create(Request $request)
    {   
        $validatedData = $request->validated();

        $healthProfile = new HealthProfile($validatedData);
        $healthProfile->user_id = $request->user()->id;
    
        if ($request->hasFile('avatar')) {
            $uploadedFileUrl = cloudinary()->upload($request->file('avatar')->getRealPath())->getSecurePath();
            $healthProfile->avatar = $uploadedFileUrl;
        }
    
        $healthProfile->save();
    
        return response()->json([
            'message' => 'Health profile created successfully',
            'health_profile_id' => $healthProfile->id
        ], 201);
    }




    public function destroy($id)
    {
        $healthProfile = HealthProfile::find($id);

        if (!$healthProfile) {
            return response()->json(['message' => 'Health profile not found'], 404);
        }

        if ($healthProfile->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $healthProfile->delete();

        return response()->json(['message' => 'Health profile deleted successfully'], 200);
    }

    public function update(Request $request, $id)
    {
        $healthProfile = HealthProfile::find($id);

        if (!$healthProfile) {
            return response()->json(['message' => 'Health profile not found'], 404);
        }

        if ($healthProfile->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $healthProfile->name = $request->input('name');
        $healthProfile->relationship = $request->input('relationship');
        $healthProfile->date_of_birth = $request->input('date_of_birth');
        $healthProfile->gender = $request->input('gender');
        $healthProfile->height = $request->input('height');
        $healthProfile->weight = $request->input('weight');
        $healthProfile->save();
    }
}

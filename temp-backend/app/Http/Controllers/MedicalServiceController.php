<?php

namespace App\Http\Controllers;

use App\Models\MedicalService;
use App\Http\Requests\StoreMedicalServiceRequest;
use App\Http\Requests\UpdateMedicalServiceRequest;
use Illuminate\Support\Facades\Gate;
class MedicalServiceController extends Controller
{
    public function __construct()
    {
        $this->middleware('role:facility,admin')->only(['store', 'update', 'destroy']);
    }

    public function index()
    {
        return MedicalService::all();
    }

    public function store(StoreMedicalServiceRequest $request)
    {   
        $fields = $request->validated();
        if($request->hasFile('thumbnail')) {
            $fields['thumbnail'] = cloudinary()->upload($request->file('thumbnail')->getRealPath())->getSecurePath();
        }
        $fields['medical_facility_id'] = $request->user()->medicalFacility->id;
        $medicalService = MedicalService::create($fields);
        $medicalService->doctors()->sync($request->doctor_ids);
        return response()->json($medicalService, 201);
    }

    public function show(MedicalService $medicalService)
    {
        return $medicalService;
    }

    public function update(UpdateMedicalServiceRequest $request, MedicalService $medicalService)
    {   
        Gate::authorize('modify', $medicalService);
        $fields = $request->validated();
        if($request->hasFile('thumbnail')) {
            $fields['thumbnail'] = cloudinary()->upload($request->file('thumbnail')->getRealPath())->getSecurePath();
        }
        $medicalService->update($fields);
        $medicalService->doctors()->sync($request->doctor_ids);
        return response()->json($medicalService, 200);
    }

    public function destroy(MedicalService $medicalService)
    {   
        Gate::authorize('modify', $medicalService);
        $medicalService->delete();
        return response()->json("delete sucessfully", 204);
    }
}

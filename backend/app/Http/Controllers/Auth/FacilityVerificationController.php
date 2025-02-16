<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\role\Facility;

class FacilityVerificationController extends Controller
{
    public function uploadDocuments(Request $request)
    {
        $request->validate([
            'documents.*' => 'required|mimes:pdf,jpg,png|max:2048', // Chỉ chấp nhận PDF, JPG, PNG
        ]);

        $facility = Facility::where('user_id', auth()->id())->firstOrFail();
        
        $facility->verification_status = 'pending';
        $facility->tax_code = $request->input('tax_code');
        $facility->medical_practice_license = cloudinary()->upload($request->file('medical_practice_license')->getRealPath())->getSecurePath();
        $facility->bussiness_registration_certificate = cloudinary()->upload($request->file('bussiness_registration_certificate')->getRealPath())->getSecurePath();
        $facility->save();

        return response()->json(['message' => 'Giấy tờ đã được tải lên, chờ admin phê duyệt.']);
    }
}

<?php

namespace App\Http\Controllers\Admin;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\role\Facility;

class UserManageController extends Controller
{
    public function viewAllUsers()
    {
        $users = User::select('id', 'name', 'email', 'role')->get();
        return response()->json($users);
    }


    public function getFacilityRequestes()
    {
        $facilities = Facility::where('verification_status', 'pending')->get();
        return response()->json($facilities);
    }


    public function approveFacility($facilityId)
    {
        $facility = Facility::find($facilityId);
        if ($facility) {
            $facility->status = 'approved';
            $facility->save();
            return redirect()->back()->with('success', 'Facility approved successfully.');
        }
        return redirect()->back()->with('error', 'Facility not found.');
    }

    public function rejectFacility($facilityId)
    {
        $facility = Facility::find($facilityId);
        if ($facility) {
            $facility->status = 'rejected';
            $facility->save();
            return redirect()->back()->with('success', 'Facility rejected successfully.');
        }
        return redirect()->back()->with('error', 'Facility not found.');
    }
}

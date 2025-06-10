<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Http\Requests\StoreAppointmentRequest;
use App\Http\Requests\UpdateAppointmentRequest;
use App\Models\Bill;
use App\Models\MedicalService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
     
        $healthProfiles = $request->user()->patient->healthProfiles;
        $appointments = [];
        foreach ($healthProfiles as $healthProfile) {
            $healthProfileAppointments = $healthProfile->appointments()->with(['medicalService','doctor','medicalFacility'])->get();
            foreach ($healthProfileAppointments as $appointment) {
                $appointments[] = $appointment;
            }
        }
        return $appointments;
    }

    public function getByDate(Request $request)
    {
        $date = $request->query('date');
        $healthProfiles = $request->user()->patient->healthProfiles;
        $appointments = [];
        foreach ($healthProfiles as $healthProfile) {
            $healthProfileAppointments = $healthProfile->appointments()->with(['medicalService','doctor','medicalFacility'])->where('date', $date)->get();
            foreach ($healthProfileAppointments as $appointment) {
                $appointments[] = $appointment;
            }
        }
        return $appointments;
    }

    public function indexByDoctor(Request $request)
    {
        return $request->user()->doctor->appointments()->with(['healthProfile','medicalService','doctor'])->get();
    }



    public function indexByFacility(Request $request)
    {
        return $request->user()->medicalFacility->appointments()->with(['healthProfile','medicalService','doctor'])->get();
    }


    public function store(StoreAppointmentRequest $request)
    {
        // Check if the user is a patient
        $user = $request->user();
        if ($user->role_id !== 2) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $fields = $request->validated();
        if(!$user->patient->healthProfiles()->where('id', $fields['health_profile_id'])->exists()) {
            return response()->json(['message' => 'User not allowed to book for this profile.'], 404);
        }
        $medicalService = MedicalService::find($fields['medical_service_id']);
        $facility =  $medicalService->medicalFacility;
        $appointment = Appointment::create([
            'medical_service_id' =>  $medicalService->id,
            'health_profile_id' => $fields['health_profile_id'],
            'facility_id' => $facility->id,
            'date' => $fields['date'],
            'start_time' => $fields['start_time'],
            'end_time' => $fields['end_time'],
            'reason' => $fields['reason'] ?? null,
            'status' => "pending",
        ]);

        $bill = Bill::create([
            'health_profile_id' => $fields['health_profile_id'],
            'medical_facility_id' => $facility->id,
            'appointment_id' => $appointment->id,
            'status' => 'pending',
            'payment_method' => 'vnpay',
            'total_amount' => $medicalService->price,
        ]);
        $bill->services()->attach($fields['medical_service_id'], ['quantity' => 1]);

        broadcast(new \App\Events\AppointmentBookedEvent($appointment));

        return response()->json([
            'message' => 'Appointment created successfully',
        ], 201);
    }

    public function createByDoctor(Request $request)
    {
        $doctor = $request->user()->doctor;
        $fields = $request->validate([
            'medical_service_id' => 'required|exists:medical_services,id',
            'health_profile_id' => 'required|exists:health_profiles,id',
            'date' => 'required|date',
            'start_time' => 'required|date_format:H:i:s',
            'end_time' => 'required|date_format:H:i:s',
            'reason' => 'nullable|string',
        ]);

        $appointment = Appointment::create([
            'medical_service_id' =>  $fields['medical_service_id'],
            'health_profile_id' => $fields['health_profile_id'],
            'doctor_id' => $doctor->id,
            'facility_id' => $doctor->medicalFacility->id,
            'date' => $fields['date'],
            'start_time' => $fields['start_time'],
            'end_time' => $fields['end_time'],
            'reason' => $fields['reason'] ?? null,
            'status' => "assigned",
        ]);

        Bill::create([
            'health_profile_id' => $fields['health_profile_id'],
            'medical_facility_id' => $doctor->medicalFacility->id,
            'appointment_id' => $appointment->id,
            'status' => 'pending',
            'payment_method' => 'vnpay',
            'total_amount' => $appointment->medicalService->price,
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
        return $appointment->load(['healthProfile', 'medicalService', 'doctor', 'medicalFacility','medicalRecord']);
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

    public function assignDoctor(Request $request)
    {
        $appointment = Appointment::find($request->input('appointment_id'));
        $doctor = $request->input('doctor_id');
        $appointment->update([
            'doctor_id' => $doctor,
            'status' => 'assigned',
        ]);

        return response()->json([
            'message' => 'Doctor assigned successfully',
        ], 200);
    }

    public function addResult(Request $request, Appointment $appointment)
    {
        try {
            DB::beginTransaction();

            $medicalRecord = $appointment->medicalRecord()->create([
                'doctor_id' => $request->user()->doctor->id,
                'health_profile_id' => $appointment->healthProfile->id,
                'diagnosis' => $request->input('diagnosis'),
            ]);

            if($request->input('indicators') != null){
                $examination = $medicalRecord->examinations()->create([
                    'test_name' => 'metrics',
                    'examination_type' => 'metrics',
                    'conclusion' => $request->input('indicatorTestSummary') ?? 'No conclusion provided',
                ]);
                $examination->indicators()->createMany(json_decode($request->input('indicators'),true));
            }

            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $index => $imageFile) {
                    $examinationName = $request->input("examinationNames.$index");

                    $examination = $medicalRecord->examinations()->create([
                        'test_name' => $examinationName,
                        'examination_type' => 'images',
                        'conclusion' => $request->input('imageTestSummary') || 'No conclusion provided',
                    ]);

                    $examination->images()->create([
                        'image_path' => cloudinary()->upload($imageFile->getRealPath())->getSecurePath(),
                    ]);
                }
            }

            $medicines = json_decode($request->input('medicines'),true);
            if($medicines != null){
                $prescription = $medicalRecord->prescription()->create();
                foreach ($medicines as $medicine) {
                    $prescription->medicines()->attach($medicine['id'], [
                        'medicine_id' => $medicine['id'],
                        'usage' => $medicine['usage'],
                        'amount' => (int) $medicine['amount'],
                    ]);
                }
            }

            $appointment->update([
                'result_release_date' => now(),
                'status' => 'completed',
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Result added successfully',
                'medicines' => $medicines,
            ], 200);

        } catch (Exception $e) {
            DB::rollBack();
            
            // Log the error for debugging
            \Log::error('Error adding result: ' . $e->getMessage());
            \Log::error($e->getTraceAsString());

            return response()->json([
                'message' => 'Failed to add result. Please try again.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function cancel(Request $request, Appointment $appointment)
    {
        $fields = $request->validate([
            'reason' => 'required|string',
        ]);

        $appointment->update([
            'status' => 'cancelled',
            'reason' => $fields['reason'],
        ]);

        return response()->json([
            'message' => 'Appointment cancelled successfully',
        ], 200);
    }
}

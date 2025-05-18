<?php

namespace App\Http\Controllers;

use App\Models\MedicalService;
use App\Http\Requests\StoreMedicalServiceRequest;
use App\Http\Requests\UpdateMedicalServiceRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use App\Models\Appointment;
use Carbon\Carbon;
use App\Models\Role\MedicalFacility;

class MedicalServiceController extends Controller
{
    public function __construct()
    {
        $this->middleware('role:facility,admin')->only(['store', 'update', 'destroy']);
        $this->middleware('role:facility, admin, doctor')->only(['indexByFacility']);
    }

    public function index(Request $request)
    {
        $search = $request->query('q');
        $gender = $request->query('gender');
        $min_price = $request->query('minPrice');
        $max_price = $request->query('maxPrice');
        return response()->json([
            "services" => MedicalService::search($search)->gender($gender)->price($min_price, $max_price)->get(),
            "facilities" => MedicalFacility::select('id','facility_name','address','phone','logo')->get(),
        ]);
    }

    public function indexByFacility(Request $request)
    {
        return $request->user()->medicalFacility->services()->with('doctors')->get();
    }

    public function indexByDoctor(Request $request)
    {
        $doctor = $request->user()->doctor;
        return $doctor->handleService;
    }

    public function store(StoreMedicalServiceRequest $request)
    {   
        $fields = $request->validated();
        if($request->hasFile('thumbnail')) {
            $fields['thumbnail'] = cloudinary()->upload($request->file('thumbnail')->getRealPath())->getSecurePath();
        }
        $fields['medical_facility_id'] = $request->user()->medicalFacility->id;
        $medicalService = MedicalService::create($fields);
        $doctor_ids = json_decode($request->doctors);
        $medicalService->doctors()->sync($doctor_ids);
        return response()->json($medicalService, 201);
    }

    public function show(MedicalService $medicalService, Request $request)
    {
        return $medicalService->load(['medicalFacility','doctors','appointments']);
    }

    public function update(UpdateMedicalServiceRequest $request, MedicalService $medicalService)
    {   
        Gate::authorize('modify', $medicalService);
        $fields = $request->validated();
        if($request->hasFile('thumbnail')) {
            $fields['thumbnail'] = cloudinary()->upload($request->file('thumbnail')->getRealPath())->getSecurePath();
        }
        $medicalService->update($fields);
        $doctor_ids = json_decode($request->doctors);
        $medicalService->doctors()->sync($doctor_ids);
        return response()->json($medicalService->load(['doctors']), 200);
    }

    public function destroy(MedicalService $medicalService)
    {   
        Gate::authorize('modify', $medicalService);
        $medicalService->delete();
        return response()->json("delete sucessfully", 204);
    }


    public function getAvaliableSlots(Request $request)
    {
        $id = $request->query('id');
        $date = $request->query('date');
        $dayOfWeek = Carbon::parse($date)->dayOfWeek;
        $dayMap = [
            0 => 'Chủ Nhật',
            1 => 'Thứ Hai',
            2 => 'Thứ Ba',
            3 => 'Thứ Tư',
            4 => 'Thứ Năm',
            5 => 'Thứ Sáu',
            6 => 'Thứ Bảy',
        ];
        $dayName = $dayMap[$dayOfWeek];

        $medicalService = MedicalService::find($id);
        $doctors = $medicalService->doctors()->with('schedule')->get();
        $slots = [];
        foreach ($doctors as $doctor) {
            foreach ($doctor->schedule as $schedule) {
                if ($schedule->day_of_week != $dayName) {
                    continue;
                }
                $startTime = Carbon::createFromTimeString($schedule->start_time);
                $endTime = Carbon::createFromTimeString($schedule->end_time);
    
                // Làm tròn thời gian bắt đầu lên giờ chẵn
                if ($startTime->minute > 0) {
                    $startTime->addHour()->minute(0)->second(0);
                }
    
                // Làm tròn thời gian kết thúc xuống giờ chẵn
                if ($endTime->minute > 0) {
                    $endTime->minute(0)->second(0);
                }
    
                // Tạo các ca khám 1 giờ
                while ($startTime < $endTime) {
                    $slotStart = $startTime->format('H:i:s');
                    $slotEnd = $startTime->copy()->addHour()->format('H:i:s');
    
                    // Kiểm tra số bệnh nhân bác sĩ đã đảm nhận trong ca khám này
                    $patientCount = Appointment::where('date', $date)
                        ->where('start_time', $slotStart)
                        ->where('end_time', $slotEnd)
                        ->where('doctor_id', $doctor->id)
                        ->count();
    
                    // Xác định key cho ca khám
                    $slotKey = $slotStart . '-' . $slotEnd;
    
                    // Nếu ca khám đã tồn tại, cộng dồn số lượng bác sĩ
                    if (isset($slots[$slotKey])) {
                        $slots[$slotKey]['available'] += (3 - $patientCount);
                    } else {
                        // Tạo mới ca khám
                        $slots[$slotKey] = [
                            'start_time' => $slotStart,
                            'end_time' => $slotEnd,
                            'available' => 3 - $patientCount,
                        ];
                    }
    
                    // Tăng thời gian thêm 1 giờ để tạo ca tiếp theo
                    $startTime->addHour();
                }
            }
        }
    
        // Chuyển đổi mảng từ dạng key-value sang mảng thuần túy
        $result = array_values($slots);
    
        return response()->json($result);
    }

    public function getAvaliableSlotsForDoctor(Request $request)
    {

        $date = $request->query('date');
        $doctor = $request->user()->doctor;
        $dayOfWeek = Carbon::parse($date)->dayOfWeek;
        $dayMap = [
            0 => 'Chủ Nhật',
            1 => 'Thứ Hai',
            2 => 'Thứ Ba',
            3 => 'Thứ Tư',
            4 => 'Thứ Năm',
            5 => 'Thứ Sáu',
            6 => 'Thứ Bảy',
        ];
        $dayName = $dayMap[$dayOfWeek];
        $schedule = $doctor->schedule()->where('day_of_week', $dayName)->first();
        if(!$schedule) {
            return response()->json([]);
        }
        $startTime = Carbon::createFromTimeString($schedule->start_time);
        $endTime = Carbon::createFromTimeString($schedule->end_time);
        // Làm tròn thời gian bắt đầu lên giờ chẵn
        if ($startTime->minute > 0) {
            $startTime->addHour()->minute(0)->second(0);
        }
        // Làm tròn thời gian kết thúc xuống giờ chẵn
        if ($endTime->minute > 0) {
            $endTime->minute(0)->second(0);
        }
        // Tạo các ca khám 1 giờ
        $slots = [];
        while ($startTime < $endTime) {
            $slotStart = $startTime->format('H:i:s');
            $slotEnd = $startTime->copy()->addHour()->format('H:i:s');

            // Kiểm tra số bệnh nhân bác sĩ đã đảm nhận trong ca khám này
            $patientCount = Appointment::where('date', $date)
                ->where('start_time', $slotStart)
                ->where('end_time', $slotEnd)
                ->where('doctor_id', $doctor->id)
                ->count();

            // Xác định key cho ca khám
            $slotKey = $slotStart . '-' . $slotEnd;

            // Nếu ca khám đã tồn tại, cộng dồn số lượng bác sĩ
            if (isset($slots[$slotKey])) {
                $slots[$slotKey]['available'] += (3 - $patientCount);
            } else {
                // Tạo mới ca khám
                $slots[$slotKey] = [
                    'start_time' => $slotStart,
                    'end_time' => $slotEnd,
                    'available' => 3 - $patientCount,
                ];
            }

            // Tăng thời gian thêm 1 giờ để tạo ca tiếp theo
            $startTime->addHour();
        }
        // Chuyển đổi mảng từ dạng key-value sang mảng thuần túy
        $result = array_values($slots);
        return response()->json($result);
    }

    public function getDoctorsForAppointment(Request $request)
    {
        $id = $request->query('id');
        $appointmentId = $request->query('appointment_id');
        $appointment = Appointment::find($appointmentId);
        $medicalService = MedicalService::find($id);
        $doctors = $medicalService->doctors()->with('schedule')->get();
        $valiabeDoctors = [];
        foreach($doctors as $doctor) {
            $appointmentCount = Appointment::where('doctor_id', $doctor->id)
                ->where('date', $appointment->date)
                ->where('start_time', $appointment->start_time)
                ->where('end_time', $appointment->end_time)
                ->count();
            if($appointmentCount < 3) {
                $valiabeDoctors[] = $doctor;
            }
        }
        return response()->json($valiabeDoctors);
    }
}

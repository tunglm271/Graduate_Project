<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Role\Doctor;
use App\Models\Role\MedicalFacility;
use App\Models\MedicalService;
use App\Models\HealthProfile;

class Appointment extends Model
{
    /** @use HasFactory<\Database\Factories\AppointmentFactory> */
    use HasFactory;

    protected $fillable = [
        'health_profile_id',
        'doctor_id',
        'medical_service_id',
        'facility_id',
        'status',
        'date',
        'start_time',
        'end_time',
        'reason',
    ];

    protected $casts = [
        'date' => 'datetime',
        'time' => 'datetime',
    ];

    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }

    public function medicalService()
    {
        return $this->belongsTo(MedicalService::class);
    }

    public function healthProfile()
    {
        return $this->belongsTo(HealthProfile::class);
    }

    public function medicalFacility()
    {
        return $this->belongsTo(MedicalFacility::class);
    }

    public function bill() 
    {
        return $this->hasOne(Bill::class);

    }
}

<?php

namespace App\Models\Role;

use App\Models\MedicalService;
use App\Models\Schedule;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Appointment;
use App\Models\Role\MedicalFacility;

class Doctor extends Model
{
    /** @use HasFactory<\Database\Factories\Role\DoctorFactory> */
    use HasFactory;
    protected $fillable = [
        'user_id',
        'medical_facility_id',
        'name',
        'phone',
        'position',
        'specialization',
        'about',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function medicalFacility()
    {
        return $this->belongsTo(MedicalFacility::class);
    }

    public function handleService($service) {
        return $this->belongsToMany(MedicalService::class, 'doctor_services', 'doctor_id', 'service_id');
    }

    public function schedule()
    {
        return $this->hasMany(Schedule::class);
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }
}

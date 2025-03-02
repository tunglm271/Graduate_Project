<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Role\MedicalFacility;
use App\Models\Role\Doctor;

class MedicalService extends Model
{
    /** @use HasFactory<\Database\Factories\MedicalServiceFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'category',
        'thumbnail',
        'price',
        'duration',
        'status',
        'specialist_required',
        'preparation_instruction',
        'service_audience_gender',
        'medical_facility_id',
    ];

    public function medicalFacility()
    {
        return $this->belongsTo(MedicalFacility::class);
    }

    public function doctors()
    {
        return $this->belongsToMany(Doctor::class, 'doctors_medical_services', 'medical_service_id', 'doctor_id');
    }
}

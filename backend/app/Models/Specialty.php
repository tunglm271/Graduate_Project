<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Role\MedicalFacility;
use App\Models\Role\Doctor;

class Specialty extends Model
{
    use HasFactory;

    protected $fillable = [
        'medical_facility_id',
        'name',
        'department_code',
        'description',
        'is_active',
    ];

    // Mối quan hệ với cơ sở y tế
    public function medicalFacility()
    {
        return $this->belongsTo(MedicalFacility::class);
    }

    // (Optional) Mối quan hệ với bác sĩ qua bảng trung gian
    public function doctors()
    {
        return $this->belongsToMany(Doctor::class, 'doctor_specialties');
    }
}

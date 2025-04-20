<?php

namespace App\Models\Role;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\MedicalService;
use App\Models\Appointment;
use App\Models\HealthProfile;
class MedicalFacility extends Model
{
    /** @use HasFactory<\Database\Factories\Role\MedicalFacilityFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'facility_name',
        'phone',
        'address',
        'description',
        'status',
        'working_time',
        'thumbnail',
        'logo',
        'website',
        'lat',
        'lng',
        'legal_representative_name',
        'legal_representative_id',
        'tax_code',
        'medical_practice_license',
        'issuance_date',
        'issuance_place',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function services()
    {
        return $this->hasMany(MedicalService::class);
    }

    public function doctors()
    {
        return $this->hasMany(Doctor::class);
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class, 'facility_id');
    }

    public function patients()
    {
        return $this->hasManyThrough(HealthProfile::class, Appointment::class, 'facility_id', 'id', 'id', 'health_profile_id');
    }
}

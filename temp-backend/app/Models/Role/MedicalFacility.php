<?php

namespace App\Models\Role;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\MedicalService;

class MedicalFacility extends Model
{
    /** @use HasFactory<\Database\Factories\Role\MedicalFacilityFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'facility_name',
        'address',
        'description',
        'status',
        'website',
        'tax_code',
        'thumbnail',
        'status',
        'medical_practice_license',
        'bussiness_registration_certificate'
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
}

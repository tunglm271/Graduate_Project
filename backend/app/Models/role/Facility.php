<?php

namespace App\Models\role;

use Illuminate\Database\Eloquent\Model;

class Facility extends Model
{
    protected $fillable = [
        'user_id',
        'address',
        'facility_name',
        'description',
        'verification_status',
        'tax_code',
        'medical_practice_license',
        'bussiness_registration_certificate',
    ];
}

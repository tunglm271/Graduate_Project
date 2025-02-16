<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HealthProfile extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'avatar',
        'relationship',
        'gender',
        'height',
        'weight',
        'date_of_birth',
        'allergies',
        'chronic_diseases',
        'medical_insurance_number',
    ];
}

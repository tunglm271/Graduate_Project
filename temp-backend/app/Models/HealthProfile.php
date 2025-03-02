<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Role\Patient;
class HealthProfile extends Model
{
    /** @use HasFactory<\Database\Factories\HealthProfileFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'relationship',
        'avatar',
        'gender',
        'height',
        'weight',
        'date_of_birth',
        'patient_id',
        'medical_insurance_number',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public function chronicDiseases()
    {
        return $this->belongsToMany(ChronicDisease::class, 'health_profile_chronic_disease');
    }

    public function allergies()
    {
        return $this->belongsToMany(Allergy::class, 'health_profile_allergy');
    }
}

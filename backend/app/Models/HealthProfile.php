<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Role\Patient;
use App\Models\Allergy;
use App\Models\Disease;
use Illuminate\Support\Facades\DB;
class HealthProfile extends Model
{
    /** @use HasFactory<\Database\Factories\HealthProfileFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'relationship',
        'avatar',
        'gender',
        'date_of_birth',
        'patient_id',
        'medical_insurance_number',
        'ethnic_group',
        'phone',
        'address',
        'email',
        'otp',
        'insurance_expiration_date',
        'hometown_id',
    ];

    protected $appends = [
        'home_town_name',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public function allergies()
    {
        return $this->belongsToMany(Allergy::class, 'health_profile_allergy');
    }

    public function diseases() 
    {
        return $this->belongsToMany(Disease::class,"health_profile_disease");
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    public function medicalRecords()
    {
        return $this->hasMany(MedicalRecord::class);
    }


    public function profileMedicines()
    {
        return $this->hasMany(ProfileMedicine::class);
    }

    public function profileMedicineLogs()
    {
        return $this->hasMany(ProfileMedicineLog::class);
    }

    public function hometown() {
        return $this->belongsTo(City::class, 'hometown_id');
    }

    public function getHomeTownNameAttribute() {
        return $this->hometown ? $this->hometown->name : null;
    }

    public function latestIndicators()
    {
        $subquery = HealthProfileIndicator::select(DB::raw('MAX(id) as id'))
            ->where('health_profile_id', $this->id)
            ->groupBy('indicator_id');

        return HealthProfileIndicator::with('indicatorType')
            ->whereIn('id', $subquery)
            ->get();
    }

    public function indicatorHistory($indicatorTypeId)
    {
        return $this->hasMany(HealthProfileIndicator::class)
            ->where('indicator_id', $indicatorTypeId)
            ->orderByDesc('created_at');
    }
}

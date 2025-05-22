<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Role\MedicalFacility;
use App\Models\MedicalService;

class Sale extends Model
{
    protected $fillable = [
        'medical_service_id',
        'type',
        'value',
        'is_active',
    ];

    public function medicalService()
    {
        return $this->belongsTo(MedicalService::class);
    }

    public function medicalFacility()
    {
        return $this->belongsTo(MedicalFacility::class);
    }
}

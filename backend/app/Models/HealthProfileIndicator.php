<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HealthProfileIndicator extends Model
{    
    protected $fillable = [
        'value',
        'appointment_id',
        'health_profile_id',
        'indicator_id',
    ];


    public function appointment()
    {
        return $this->belongsTo(Appointment::class, 'appointment_id');
    }
    
    public function indicatorType()
    {
        return $this->belongsTo(IndicatorType::class, 'indicator_id');
    }

    public function healthProfile()
    {
        return $this->belongsTo(HealthProfile::class, 'health_profile_id');
    }
}

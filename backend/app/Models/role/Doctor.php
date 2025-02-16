<?php

namespace App\Models\role;

use Illuminate\Database\Eloquent\Model;
use App\Models\MedicalService;
use App\Models\User;

class Doctor extends Model
{
    protected $fillable = [
        'address',
        'specialization',
        'about',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function services()
    {   
        return $this->belongsToMany(MedicalService::class, 'doctor_services');
    }
}

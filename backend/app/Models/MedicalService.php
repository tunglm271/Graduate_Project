<?php

namespace App\Models;

use App\Models\role\Facility;
use Illuminate\Database\Eloquent\Model;

class MedicalService extends Model
{
    protected $fillable = [
        'facility_id',
        'name',
        'description',
        'category',
        'thumbnail',
        'price',
        'duration',
        'status',
        'specialist_required',
        'preparation_instruction',
        'service_audience_gender'
    ];

    public function facility() {
        return $this->belongsTo(Facility::class);
    }
}

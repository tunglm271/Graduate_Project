<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Role\Doctor;

class Schedule extends Model
{
    /** @use HasFactory<\Database\Factories\ScheduleFactory> */
    use HasFactory;

    protected $fillable = [
        'doctor_id',
        'date',
        'start_time',
        'end_time',
    ];

    // Liên kết với Doctor
    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }
}

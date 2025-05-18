<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class AppointmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::transaction(function () {
            $appointments = [
                [
                    'date' => now()->addDays(1)->toDateString(),
                    'start_time' => '09:00',
                    'end_time' => '10:00',
                    'status' => 'pending',
                    'reason' => 'General check-up',
                    'health_profile_id' => 1,
                    'doctor_id' => 1,
                    'medical_service_id' => 1,
                    'facility_id' => 1,
                ],
                [
                    'date' => now()->addDays(2)->toDateString(),
                    'start_time' => '11:00',
                    'end_time' => '12:00',
                    'status' => 'pending',
                    'reason' => 'Follow-up consultation',
                    'health_profile_id' => 2,
                    'doctor_id' => 2,
                    'medical_service_id' => 2,
                    'facility_id' => 2,
                ],
            ];
        
            foreach ($appointments as $appointmentData) {
                DB::table('appointments')->insert($appointmentData);
            }
        });
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\MedicalService;
class MedicalServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

    private $defaultImgUrl = "https://res.cloudinary.com/dftiye2et/image/upload/v1740473611/service_tcrgo5";


    public function run(): void
    {
        for ($i = 0; $i < 10; $i++) {
            $MedicalService = MedicalService::create([
                'name' => 'Medical Service ' . $i,
                'description' => 'Description for medical service ' . $i,
                'thumbnail' => $this->defaultImgUrl ,
                'category' => 'Category ' . rand(1, 3), // Example categories
                'price' => rand(100, 1000) * 1000, // Random price between 100 and 1000
                'duration' => rand(30, 120), // Random duration between 30 and 120 minutes
                'status' => 'active', // Default status
                'service_audience_gender' => ['male', 'female', 'both'][rand(0, 2)], // Random gender audience
                'medical_facility_id' => 1, // Assuming you have 5 medical facilities
            ]);
            $MedicalService->doctors()->attach([1,2]); // Assuming you have 5 doctors
        }
    }
}

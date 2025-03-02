<?php

namespace Database\Seeders;
use DB;
use App\Models\User;
use App\Models\Role\Patient;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void

    {
        // User::factory(10)->create();
        $this->call([
            // MedicineSeeder::class,
            // DiseaseSeeder::class,
            // AllergySeeder::class,
            VoyagerDatabaseSeeder::class,
        ]);
        
        $admin = User::factory()->create([
            'name' => 'Test Admin',
            'email' => 'admin@example.com',
            'password' => bcrypt('12345678'),
            'role_id' => 1,
        ]);

        DB::transaction(function ()  {
            $patient = User::factory()->create([
                'name' => 'Test Patient',
                'email' => 'patient@example.com',
                'password' => bcrypt('12345678'),
                'role_id' => 2,
            ]);

            Patient::create([
                'user_id' => $patient->id,
                'name' => $patient->name,
            ]);
    
        });
        
        User::factory()->create([
            'name' => 'Test Doctor',
            'email' => 'doctor@example.com',
            'password' => bcrypt('12345678'),
            'role_id' => 3,
        ]);        
        User::factory()->create([
            'name' => 'Test Facility',
            'email' => 'facility@example.com',
            'password' => bcrypt('12345678'),
            'role_id' => 4,
        ]);
    }
}

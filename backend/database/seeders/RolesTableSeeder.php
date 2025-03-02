<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use TCG\Voyager\Models\Role;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $roles = [
            ['name' => 'admin', 'display_name' => 'Administrator'],
            ['name' => 'patient', 'display_name' => 'Patient'],
            ['name' => 'doctor', 'display_name' => 'Doctor'],
            ['name' => 'facility', 'display_name' => 'Facility'],
            ['name' => 'user', 'display_name' => 'User'],
        ];

        foreach ($roles as $roleData) {
            Role::firstOrCreate(['name' => $roleData['name']], ['display_name' => $roleData['display_name']]);
        }
    }
}

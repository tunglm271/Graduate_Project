<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use TCG\Voyager\Models\Role;

class RolesTableSeeder extends Seeder
{
    /**
     * Auto generated seed file.
     */
    public function run()
    {
        $roles = [
            'admin' => 'Administrator',
            'patient' => 'Patient',
            'doctor' => 'Doctor',
            'facility' => 'Medical Facility',
        ];
        
        foreach ($roles as $name => $displayName) {
            $role = Role::firstOrNew(['name' => $name]);
            if (!$role->exists) {
                $role->fill(['display_name' => $displayName])->save();
            }
        }
    }
}

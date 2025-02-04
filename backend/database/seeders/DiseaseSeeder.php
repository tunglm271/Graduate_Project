<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class DiseaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Read the contents of the SQL file
        $sql = File::get(database_path('sql/diseaseData.sql'));

        // Execute the SQL commands
        DB::unprepared($sql);
    }
}
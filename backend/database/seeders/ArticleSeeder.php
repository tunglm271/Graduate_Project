<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Article;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sql = File::get(database_path('sql\vietnamese_medical_articles_insert.sql'));
        DB::unprepared($sql);
        // Article::factory()->count(20)->create([
        //     'status' => 'published',
        // ]);
    }
}

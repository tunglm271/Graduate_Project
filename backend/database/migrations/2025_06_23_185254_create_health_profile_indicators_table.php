<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('health_profile_indicators', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->float('value');

            $table->foreignId('appointment_id')->constrained('appointments')->onDelete('cascade');
            $table->foreignId('health_profile_id')->constrained('health_profiles')->onDelete('cascade');
            $table->foreignId('indicator_id')->constrained('indicator_types')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('health_profile_indicators');
    }
};

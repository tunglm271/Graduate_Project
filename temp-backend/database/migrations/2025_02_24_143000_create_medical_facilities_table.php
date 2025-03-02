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
        Schema::create('medical_facilities', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('facility_name');
            $table->string('phone')->nullable();
            $table->string('address');
            $table->text('description')->nullable();
            $table->enum('status', ['unverified', 'pending', 'rejected', 'done'])->default('pending');
            $table->string('tax_code')->nullable();
            $table->string('thumbnail')->nullable();
            $table->string('medical_practice_license')->nullable();
            $table->string('bussiness_registration_certificate')->nullable();

            $table->foreignId('user_id')->constrained()->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medical_facilities');
    }
};

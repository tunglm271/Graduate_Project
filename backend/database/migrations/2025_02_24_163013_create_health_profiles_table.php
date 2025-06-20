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
        Schema::create('health_profiles', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('name');
            $table->string('relationship');
            $table->string('avatar')->nullable();
            $table->enum('gender',['male','female', 'other'])->default('other');
            $table->date('date_of_birth')->default(now());
            $table->string('medical_insurance_number')->nullable();
            $table->string("ethnic_group")->default('Kinh')->nullable();
            $table->string('phone')->nullable();
            $table->string('address')->nullable();
            $table->string('email')->nullable();
            $table->string('otp')->nullable();
            $table->date('insurance_expiration_date')->nullable();
            $table->foreignId('hometown_id')->nullable()->constrained('cities')->nullOnDelete();

            $table->foreignId('patient_id')->constrained()->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('health_profiles');
    }
};

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
            $table->string('name');
            $table->string('relationship')->nullable();
            $table->string('avatar')->nullable();
            $table->unsignedBigInteger('user_id');
            $table->timestamps();
            $table->enum('gender',['male','female']);
            $table->integer('height');
            $table->integer('weight');
            $table->string('allergies')->nullable();
            $table->string('chronic_diseases')->nullable();
            $table->string('medical_insurance_number')->nullable();
            $table->date('date_of_birth');

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
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

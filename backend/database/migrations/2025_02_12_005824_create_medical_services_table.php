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
        Schema::create('medical_services', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("name");
            $table->text("description");
            $table->string("category");
            $table->string('thumbnail');
            $table->decimal('price',10,2)->default(0);
            $table->integer('duration')->nullable();
            $table->enum('status',['active', 'inactive'])->default('active');
            $table->string("specialist_required")->nullable();
            $table->string('preparation_instruction')->nullable();
            $table->enum('service_audience_gender',['male','female','both'])->default('both');
            
            $table->foreignId('facility_id')->constrained('facilities')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medical_services');
    }
};

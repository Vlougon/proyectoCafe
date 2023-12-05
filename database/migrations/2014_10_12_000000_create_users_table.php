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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->enum('rol',['teacher', 'head_of_department', 'study_manager']);
            $table->tinyInteger('total_hours')->default(0);
            $table->string('schedule_status')->default("started");
            $table->text('observatioins')->nullable();
            $table->string('profile_picture')->default('');
            $table->foreignId('especialidad_id')->onDelete('set null')->nullable();
            $table->foreignId('departamento_id')->onDelete('set null')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};

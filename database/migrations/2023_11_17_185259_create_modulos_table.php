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
        Schema::create('modulos', function (Blueprint $table) {
            $table->id();
            $table->tinyText('code');
            $table->tinyText('subject');
            $table->unsignedTinyInteger('hours_per_week');
            $table->unsignedTinyInteger('total_hours');
            $table->string('weekly_distribution')->nullable();
            $table->tinyInteger('classroom')->default(0);
            $table->foreignId('user_id')->onDelete('set null')->nullable();
            $table->foreignId('especialidad_id')->onDelete('set null')->nullable();
            $table->foreignId('curso_id')->onDelete('set null')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('modulos');
    }
};

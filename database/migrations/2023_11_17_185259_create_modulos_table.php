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
            $table->tinyText('codigo');
            $table->tinyText('materia');
            $table->unsignedTinyInteger('h_semanales');
            $table->unsignedTinyInteger('h_totales');
            $table->foreignId('user_id');
            $table->foreignId('especialidad_id');
            $table->foreignId('curso_id');
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

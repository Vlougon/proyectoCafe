<?php

namespace Database\Seeders;

use App\Models\AulaModulo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AulaModuloSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AulaModulo::factory()->count(10)->create();
    }
}

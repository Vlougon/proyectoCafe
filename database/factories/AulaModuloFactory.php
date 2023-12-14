<?php

namespace Database\Factories;

use App\Models\Aula;
use App\Models\Modulo;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AulaModulo>
 */
class AulaModuloFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'aula_id' => Aula::factory()->create()->id,
            'modulo_id' => Modulo::factory()->create()->id,
        ];
    }
}

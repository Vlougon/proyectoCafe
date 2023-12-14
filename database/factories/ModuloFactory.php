<?php

namespace Database\Factories;

use App\Models\Curso;
use App\Models\Especialidad;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Modulo>
 */
class ModuloFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'code' => $this->faker->unique()->word,
            'subject' => $this->faker->sentence,
            'hours_per_week' => $this->faker->numberBetween(1, 10),
            'total_hours' => $this->faker->numberBetween(10, 50),
            'weekly_distribution' => $this->faker->randomElement(['1 + 2 + 2', '1 + 1 + 3 + 3', '2 + 2 + 2', '3 + 3']),
            'classroom' => $this->faker->numberBetween(1, 10),
            'user_id' => User::factory()->create()->id,
            'especialidad_id' => Especialidad::factory()->create()->id,
            'curso_id' => Curso::factory()->create()->id,
        ];
    }
}

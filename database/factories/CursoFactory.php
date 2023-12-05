<?php

namespace Database\Factories;

use App\Models\Curso;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Curso>
 */
class CursoFactory extends Factory
{

    protected $model = Curso::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->sentence(1),
            'group' => $this->faker->randomElement(['1º', '2º']),
            'turn' => $this->faker->randomElement(['morning', 'evening']),
            'year' => $this->faker->year,
        ];
    }
}

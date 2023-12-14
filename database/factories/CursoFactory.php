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
            'course' => $this->faker->sentence(2),
            'turn' => $this->faker->randomElement(['M', 'T']),
        ];
    }
}

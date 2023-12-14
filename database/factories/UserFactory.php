<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'email_verified_at' => now(),
            'password' => bcrypt('password'),
            'rol' => $this->faker->randomElement(['teacher', 'head_of_department', 'study_manager']),
            'total_hours' => $this->faker->numberBetween(0, 40),
            'schedule_status' => $this->faker->randomElement(['started', 'sent']),
            'observatioins' => $this->faker->text,
            'profile_picture' => $this->faker->imageUrl(),
            'especialidad_id' => $this->faker->numberBetween(1, 10),
            'departamento_id' => $this->faker->numberBetween(1, 10),
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}

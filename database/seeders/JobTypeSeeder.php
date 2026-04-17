<?php

namespace Database\Seeders;

use App\Models\JobType;
use Illuminate\Database\Seeder;

class JobTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        JobType::upsert(
            [
                [
                    'name' => 'Autos',
                    'unit_label' => 'component(s)',
                    'wage_per_item' => 0.5,
                    'current_price' => 1.6,
                    'form_fields' => json_encode(['quantity', 'stored']),
                    'created_at' => now(),
                    'updated_at' => now()
                ],
                [
                    'name' => 'Logistics',
                    'unit_label' => 'crate(s)',
                    'wage_per_item' => 50,
                    'current_price' => 0,
                    'form_fields' => json_encode(['quantity']),
                    'created_at' => now(),
                    'updated_at' => now()
                ],
                [
                    'name' => 'Cafe',
                    'unit_label' => 'menu(s)',
                    'wage_per_item' => 25,
                    'current_price' => 0,
                    'form_fields' => json_encode(['quantity']),
                    'created_at' => now(),
                    'updated_at' => now()
                ],
            ],
            ['name'], // kolom unik
            ['unit_label', 'wage_per_item', 'current_price', 'updated_at']
        );
    }
}

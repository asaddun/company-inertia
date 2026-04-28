<?php

namespace Database\Seeders;

use App\Enums\UserLevel;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::upsert(
            [
                [
                    'name' => 'Super Admin',
                    'username' => 'super.admin',
                    'password' => Hash::make('adminsuper321'),
                    'level' => UserLevel::OWNER,
                    'created_at' => now(),
                    'updated_at' => now()
                ],
                [
                    'name' => 'Yuta Nakamura',
                    'username' => 'yuta.nakamura',
                    'password' => Hash::make('nakamura'),
                    'level' => UserLevel::MANAGEMENT,
                    'created_at' => now(),
                    'updated_at' => now()
                ],
                [
                    'name' => 'Jamie Carvinson',
                    'username' => 'jamie.carvinson',
                    'password' => Hash::make('carvinson'),
                    'level' => UserLevel::OWNER,
                    'created_at' => now(),
                    'updated_at' => now()
                ],
            ],
            ['username'],
            ['name', 'password', 'level']
        );
    }
}

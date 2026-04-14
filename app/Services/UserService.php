<?php

namespace App\Services;

use App\Enums\UserLevel;
use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserService
{
    public function getUsers($filters): LengthAwarePaginator
    {
        $query = User::query();

        // Status
        if ($filters['status'] === 'trash') {
            $query->onlyTrashed();
        }

        // Type
        if ($filters['type']) {
            switch ($filters['type']) {
                case 'all':
                    break;
                case 'member':
                    $query->where('level', '=', UserLevel::MEMBER->value);
                    break;
                case 'employee':
                    $query->where('level', '>=', UserLevel::EMPLOYEE->value);
                    break;
            }
        }

        // Search
        if ($filters['search']) {
            $query->where('name', 'like', '%' . $filters['search'] . '%');
        }

        // Sort
        if ($filters['sort']) {
            $direction = str_starts_with($filters['sort'], '-') ? 'desc' : 'asc';
            $column = ltrim($filters['sort'], '-');

            $query->orderBy($column, $direction);
        }

        return $query->paginate($filters['per_page'])->withQueryString();
    }

    public function createEmployee(array $data)
    {
        $username = Str::of($data['name'])->lower()->slug('.');
        return User::create([
            'name' => $data['name'],
            'username' => $username,
            'password' => Hash::make('companypassword'),
            'level' => UserLevel::EMPLOYEE,
        ]);
    }
}

<?php

namespace App\Services;

use App\Enums\UserLevel;
use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;

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
                    $query->where('level', UserLevel::MEMBER);
                    break;
                case 'employee':
                    $query->where('level', '>=', UserLevel::EMPLOYEE->value);
                    break;
            }
        }

        // Search
        if ($filters['search']) {
            $query->where('title', 'like', '%' . $filters['search'] . '%');
        }

        // Sort
        if ($filters['sort']) {
            $direction = str_starts_with($filters['sort'], '-') ? 'desc' : 'asc';
            $column = ltrim($filters['sort'], '-');

            $query->orderBy($column, $direction);
        }

        return $query->paginate($filters['per_page'])->withQueryString();
    }
}

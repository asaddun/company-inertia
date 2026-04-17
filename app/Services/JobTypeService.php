<?php

namespace App\Services;

use App\Models\JobType;
use Illuminate\Pagination\LengthAwarePaginator;

class JobTypeService
{
    public function getJobTypes($filters): LengthAwarePaginator
    {
        $query = JobType::query();

        // Status
        if ($filters['status'] === 'trash') {
            $query->onlyTrashed();
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
}

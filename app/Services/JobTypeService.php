<?php

namespace App\Services;

use App\Models\JobType;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

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

    public function updateJobTypes(JobType $jobType, array $data): void
    {
        $jobType->update($data);
    }

    public function updateBulkJobTypes(array $data): void
    {
        DB::transaction(function () use ($data) {
            foreach ($data as $row) {
                JobType::where('id', $row['id'])->update([
                    'name' => $row['name'],
                    'wage_per_item' => $row['wage_per_item'],
                    'current_price' => $row['current_price'],
                ]);
            }
        });
    }
}

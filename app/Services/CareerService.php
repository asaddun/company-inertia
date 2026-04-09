<?php

namespace App\Services;

use App\Models\Career;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class CareerService
{

    public function getCareers($filters): LengthAwarePaginator
    {
        $query = Career::query();

        // Status
        if ($filters['status'] === 'trash') {
            $query->onlyTrashed();
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

    public function getActiveCareers(): Collection
    {
        return Career::query()
            ->where('is_active', true)
            ->select([
                'id',
                'title',
                'employment_type',
                'description',
            ])
            ->latest()
            ->get();
    }

    public function addCareer(array $data)
    {
        return Career::create([
            'title'   => $data['title'],
            'description' => $data['description'],
            'employment_type' => $data['employment_type'],
        ]);
    }

    public function updateCareer(Career $career, array $data)
    {
        $career->update($data);

        return $career->fresh();
    }

    public function deleteCareer(Career $career)
    {
        $career->update(['is_active' => false]);
        return $career->delete();
    }

    public function restoreCareer(Career $career)
    {
        if (!$career->trashed()) {
            throw new \Exception('Career is not deleted');
        }
        return $career->restore();
    }
}

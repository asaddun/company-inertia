<?php

namespace App\Services;

use App\Models\Career;
use Illuminate\Support\Collection;

class CareerService
{

    public function getJobs(): Collection
    {
        return Career::all();
    }

    public function getActiveJobs(): Collection
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

    public function addJob(array $data)
    {
        return Career::create([
            'title'   => $data['title'],
            'description' => $data['description'],
            'employment_type' => $data['employment_type'],
        ]);
    }

    public function updateJob(Career $career, array $data)
    {
        $career->update($data);

        return $career->fresh();
    }
}

<?php

namespace App\Policies;

use App\Enums\UserLevel;
use App\Models\JobType;
use App\Models\User;

class JobTypePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, JobType $jobType): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->level->atLeast(UserLevel::MANAGEMENT);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, JobType $jobType): bool
    {
        return $user->level->atLeast(UserLevel::MANAGEMENT);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, JobType $jobType): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, JobType $jobType): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, JobType $jobType): bool
    {
        return false;
    }
}

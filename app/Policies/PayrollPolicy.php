<?php

namespace App\Policies;

use App\Enums\UserLevel;
use App\Models\Payroll;
use App\Models\User;

class PayrollPolicy
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
    public function view(User $user, Payroll $payroll): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Payroll $payroll): bool
    {
        return false;
    }

    public function updateStatus(User $user, Payroll $payroll): bool
    {
        $newStatus = request('status');

        // 🔥 rule per status
        return match ($newStatus) {
            'draft' => $user->level->atLeast(UserLevel::MANAGEMENT),
            'submitted' => true, // semua boleh submit
            'approved' => $user->level->atLeast(UserLevel::MANAGEMENT),
            'paid' => $user->level->atLeast(UserLevel::MANAGEMENT),
            default => false,
        };
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Payroll $payroll): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Payroll $payroll): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Payroll $payroll): bool
    {
        return false;
    }
}

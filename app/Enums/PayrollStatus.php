<?php

namespace App\Enums;

enum PayrollStatus: string
{
    case DRAFT = 'draft';
    case SUBMITTED = 'submitted';
    case APPROVED = 'approved';
    case PAID = 'paid';

    public function canTransitionTo(self $to): bool
    {
        return match ($this) {
            self::DRAFT => $to === self::SUBMITTED,
            self::SUBMITTED => in_array($to, [
                self::APPROVED,
                self::DRAFT,
            ]),
            self::APPROVED => $to === self::PAID,
            self::PAID => false,
        };
    }
}

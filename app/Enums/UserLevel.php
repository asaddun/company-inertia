<?php

namespace App\Enums;

enum UserLevel: int
{
    case VISITOR = 1;
    case EMPLOYEE = 2;
    case MANAGEMENT = 3;
    case OWNER = 4;

    public function label(): string
    {
        return match ($this) {
            self::VISITOR => 'Visitor',
            self::EMPLOYEE => 'Employee',
            self::MANAGEMENT => 'Management',
            self::OWNER => 'Owner',
        };
    }

    public function isManagement(): bool
    {
        return $this->value >= self::MANAGEMENT->value;
    }

    public function atLeast(self $level): bool
    {
        return $this->value >= $level->value;
    }

    public function canManage(UserLevel $target): bool
    {
        return $this->value > $target->value;
    }
}

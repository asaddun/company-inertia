<?php

namespace App\Models;

use App\Enums\PayrollStatus;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'user_id',
    'week_code',
    'total_wage_amount',
    'status',
])]
class Payroll extends Model
{
    use SoftDeletes;

    protected $casts = [
        'status' => PayrollStatus::class,
    ];

    public function reports(): HasMany
    {
        return $this->hasMany(Report::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

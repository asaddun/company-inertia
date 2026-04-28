<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'user_id',
    'payroll_id',
    'job_type_id',
    'work_date',
    'week_code',
    'quantity',
    'expected',
    'stored',
    'bonus',
    'wage_amount',
])]
class Report extends Model
{
    use SoftDeletes;

    protected $casts = [
        'quantity' => 'float',
        'expected' => 'float',
        'stored' => 'float',
        'bonus' => 'float',
        'wage_amount' => 'float',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function jobType(): BelongsTo
    {
        return $this->belongsTo(JobType::class);
    }

    public function payroll(): BelongsTo
    {
        return $this->belongsTo(Payroll::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'name',
    'unit_label',
    'wage_per_item',
    'current_price',
    'form_fields',
])]
class JobType extends Model
{
    use SoftDeletes;

    protected $casts = [
        'form_fields' => 'array',
    ];
}

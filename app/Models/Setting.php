<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        'company_name',
        'company_logo',
        'default_password'
    ];

    public static function getSetting(): self
    {
        return self::firstOrCreate(['id' => 1]);
    }
}

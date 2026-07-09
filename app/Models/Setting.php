<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Setting extends Model
{
    protected $fillable = [
        'company_name',
        'company_logo',
        'default_password'
    ];

    protected static function booted()
    {
        static::saved(function () {
            Cache::forget('app_setting');
        });

        static::deleted(function () {
            Cache::forget('app_setting');
        });
    }

    public static function getSetting(): self
    {
        $attributes = Cache::rememberForever('app_setting', function () {
            return self::firstOrCreate(['id' => 1])->attributesToArray();
        });

        return (new self)->newFromBuilder($attributes);
    }
}

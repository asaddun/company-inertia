<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class Setting extends Model
{
    protected $fillable = [
        'company_name',
        'company_logo',
        'default_password'
    ];

    protected $appends = [
        'company_logo_url',
    ];

    protected function companyLogoUrl(): Attribute
    {
        return Attribute::make(
            get: function () {

                if (!$this->company_logo) {
                    return null;
                }

                return Storage::url($this->company_logo)
                    . '?v=' . Storage::disk('public')->lastModified($this->company_logo);
            },
        );
    }

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

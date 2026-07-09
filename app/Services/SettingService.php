<?php

namespace App\Services;

use App\Models\Setting;

class SettingService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function updateSetting(Setting $setting, array $data): Setting
    {
        $setting->update($data);
        return $setting->fresh();
    }
}

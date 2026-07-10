<?php

namespace App\Services;

use App\Models\Setting;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\Format;
use Intervention\Image\ImageManager;

class SettingService
{
    protected $setting;

    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        $this->setting = Setting::getSetting();
    }

    public function updateSetting(array $data, ?UploadedFile $logo = null): Setting
    {
        if ($logo) {

            $manager = ImageManager::usingDriver(Driver::class);

            $image = $manager->decodeSplFileInfo($logo);

            // Opsional: batasi ukuran maksimum
            $image->scaleDown(width: 512);

            // Encode menjadi PNG
            $png = $image->encodeUsingFormat(Format::PNG);

            Storage::disk('public')->put(
                'company/logo.png',
                (string) $png
            );

            $data['company_logo'] = 'company/logo.png';
        }

        $this->setting->update($data);
        return $this->setting->fresh();
    }
}

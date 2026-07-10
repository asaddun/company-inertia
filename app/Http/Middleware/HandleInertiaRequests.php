<?php

namespace App\Http\Middleware;

use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $setting = Setting::getSetting();
        $logoUrl = null;

        if ($setting->company_logo && Storage::disk('public')->exists($setting->company_logo)) {
            $logoUrl = Storage::url($setting->company_logo)
                . '?v=' . Storage::disk('public')->lastModified($setting->company_logo);
        }
        return array_merge(parent::share($request), [
            'app' => [
                'company_name' => $setting->company_name,
                'company_logo' => $logoUrl,
            ],
            'auth' => [
                'user' => $request->user()?->only('id', 'name', 'username', 'level', 'bank_account_number', 'phone', 'identity_number'),
            ],
            'flash' => [
                'success' => fn() => $request->session()->get('success'),
                'error' => fn() => $request->session()->get('error'),
            ],
            'timestamp' => now()->timestamp,
        ]);
    }
}

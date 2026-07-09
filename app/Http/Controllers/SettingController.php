<?php

namespace App\Http\Controllers;

use App\Http\Requests\Setting\SettingUpdateRequest;
use App\Models\Setting;
use App\Services\SettingService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    protected $service;
    protected $setting;

    public function __construct(SettingService $service)
    {
        $this->service = $service;
        $this->setting = Setting::getSetting();
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Portal/Config/Global', [
            'settings' => $this->setting
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Setting $setting)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Setting $setting)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SettingUpdateRequest $request)
    {
        try {
            $this->service->updateSetting($this->setting, $request->validated());

            return redirect()
                ->route('global')
                ->with('success', 'Setting updated successfully');
        } catch (\Throwable $e) {
            return back()->with('error', $e ? 'Failed to update Setting, ' . $e->getMessage() : 'Failed to update Setting');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Setting $setting)
    {
        //
    }
}

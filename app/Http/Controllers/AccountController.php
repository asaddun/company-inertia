<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\UserUpdateInfoRequest;
use App\Http\Requests\User\UserUpdatePasswordRequest;
use App\Http\Requests\User\UserUpdateUsernameRequest;
use App\Models\User;
use App\Services\UserService;
use Inertia\Inertia;

class AccountController extends Controller
{
    protected $service;

    public function __construct(UserService $service)
    {
        $this->service = $service;
    }
    public function index()
    {
        return Inertia::render('Portal/Account/AccountCenter');
    }

    public function updateInfo(UserUpdateInfoRequest $request)
    {
        try {
            $this->service->updateUser($request->user(), $request->validated());

            return redirect()
                ->route('account')
                ->with('success', 'Account updated successfully');
        } catch (\Throwable $e) {
            return back()->with('error', $e ? 'Failed to update Account, ' . $e->getMessage() : 'Failed to update Account');
        }
    }

    public function updateUsername(UserUpdateUsernameRequest $request)
    {
        try {
            $this->service->updateUser($request->user(), $request->validated());

            return redirect()
                ->route('account')
                ->with('success', 'Account updated successfully');
        } catch (\Throwable $e) {
            return back()->with('error', $e ? 'Failed to update Account, ' . $e->getMessage() : 'Failed to update Account');
        }
    }

    public function updatePassword(UserUpdatePasswordRequest $request)
    {
        try {
            $this->service->updateUser($request->user(), $request->validated());

            return redirect()
                ->route('account')
                ->with('success', 'Account updated successfully');
        } catch (\Throwable $e) {
            return back()->with('error', $e ? 'Failed to update Account, ' . $e->getMessage() : 'Failed to update Account');
        }
    }
}

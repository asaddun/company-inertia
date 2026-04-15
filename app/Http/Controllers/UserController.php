<?php

namespace App\Http\Controllers;

use App\Enums\UserLevel;
use App\Http\Requests\User\UserIndexRequest;
use App\Http\Requests\User\UserStoreRequest;
use App\Http\Requests\User\UserUpdateRequest;
use App\Models\User;
use App\Services\UserService;
use Inertia\Inertia;

class UserController extends Controller
{
    protected $service;

    public function __construct(UserService $service)
    {
        $this->service = $service;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(UserIndexRequest $request)
    {
        $filters = $request->validatedWithDefaults();
        $users = $this->service->getUsers($filters);
        return Inertia::render('Portal/Users', [
            'users' => $users,
            'levels' => UserLevel::toArray(),
            'filter' => $filters,
            'defaultFilters' => $request::defaults(),
            'filterKeys' => ['search', 'type', 'status'],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserStoreRequest $request)
    {
        try {
            $this->service->createEmployee($request->validated());

            return redirect()
                ->route('users.index')
                ->with('success', 'User created successfully');
        } catch (\Throwable $e) {
            return back()->with('error', 'Failed to create User');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserUpdateRequest $request, User $user)
    {
        try {
            $this->service->updateUser($user, $request->validated());

            return redirect()
                ->route('users.index')
                ->with('success', 'User updated successfully');
        } catch (\Throwable $e) {
            return back()->with('error', $e ? 'Failed to update User, ' . $e->getMessage() : 'Failed to update User');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        try {
            $this->service->deleteUser($user);

            return redirect()
                ->route('users.index')
                ->with('success', 'User deleted successfully');
        } catch (\Throwable $e) {
            return back()->with('error', $e ? 'Failed to delete User, ' . $e->getMessage() : 'Failed to delete User');
        }
    }

    public function restore(User $user)
    {
        try {
            $this->service->restoreUser($user);

            return redirect()
                ->route('users.index')
                ->with('success', 'User restored successfully');
        } catch (\Throwable $e) {
            return back()->with('error', $e ? 'Failed to restore User, ' . $e->getMessage() : 'Failed to restore User');
        }
    }

    public function forceDelete(User $user)
    {
        try {
            $this->service->forceDeleteUser($user);

            return redirect()
                ->route('users.index')
                ->with('success', 'User deleted successfully');
        } catch (\Throwable $e) {
            return back()->with('error', $e ? 'Failed to delete User, ' . $e->getMessage() : 'Failed to delete User');
        }
    }
}

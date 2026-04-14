<?php

namespace App\Http\Controllers;

use App\Enums\UserLevel;
use App\Http\Requests\User\UserIndexRequest;
use App\Http\Requests\User\UserStoreRequest;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;
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
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}

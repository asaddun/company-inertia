<?php

namespace App\Http\Controllers;

use App\Http\Requests\Register\RegisterRequest;
use App\Services\UserService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RegisterController extends Controller
{
    protected $service;

    public function __construct(UserService $service)
    {
        $this->service = $service;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RegisterRequest $request)
    {
        $user = $this->service->createMember($request->validated());
        Auth::login($user);
        $request->session()->regenerate();

        return redirect()
            ->route('portal.dashboard')
            ->with('success', 'Account created successfully');
    }
}

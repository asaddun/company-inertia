<?php

namespace App\Http\Controllers;

use App\Http\Requests\JobType\JobTypeIndexRequest;
use App\Services\JobTypeService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobTypeController extends Controller
{
    protected $service;

    public function __construct(JobTypeService $service)
    {
        $this->service = $service;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(JobTypeIndexRequest $request)
    {
        $filters = $request->validatedWithDefaults();
        $jobTypes = $this->service->getJobTypes($filters);

        return Inertia::render('Portal/Config/JobType', [
            'jobTypes' => $jobTypes,
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    // public function updateBulk(Request $request, string $id)
    // {
    //     //
    // }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

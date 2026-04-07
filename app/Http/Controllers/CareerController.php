<?php

namespace App\Http\Controllers;

use App\Http\Requests\Career\CareerAddRequest;
use App\Http\Requests\Career\CareerUpdateRequest;
use App\Models\Career;
use App\Services\CareerService;
use Inertia\Inertia;

// use Illuminate\Http\Request;

class CareerController extends Controller
{
    protected $service;

    public function __construct(CareerService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $jobs = $this->service->getJobs();

        return Inertia::render('Office/Career', ['jobs' => $jobs]);
    }

    public function active()
    {
        $jobs = $this->service->getActiveJobs();

        // return ApiResponse::success($jobs);
    }

    public function show(Career $carrer)
    {
        // return ApiResponse::success($carrer);
    }

    public function add(CareerAddRequest $request)
    {
        $job = $this->service->addJob($request->validated());

        // return ApiResponse::success($job, 'Job created successfully');
    }

    public function update(CareerUpdateRequest $request, Career $carrer)
    {
        $job = $this->service->updateJob($carrer, $request->validated());

        // return ApiResponse::success($job, 'Job updated successfully');
    }
}

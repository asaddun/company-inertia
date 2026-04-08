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
        $careers = $this->service->getJobs();

        return Inertia::render('Office/Career', ['careers' => $careers]);
    }

    public function active()
    {
        // $careers = $this->service->getActiveJobs();

        // return Inertia::render('Career', ['careers' => $careers]);
    }

    // public function show(Career $carrer)
    // {
    //     return ApiResponse::success($carrer);
    // }

    public function add(CareerAddRequest $request)
    {
        try {
            $this->service->addJob($request->validated());

            return redirect()
                ->route('careers.index')
                ->with('success', 'Career created successfully');
        } catch (\Throwable $e) {
            return back()->with('error', 'Failed create Career');
        }
    }

    public function update(CareerUpdateRequest $request, Career $career)
    {
        try {
            $this->service->updateJob($career, $request->validated());

            return redirect()
                ->route('careers.index')
                ->with('success', 'Career updated successfully');
        } catch (\Throwable $e) {
            return back()->with('error', 'Failed update Career');
        }
    }
}

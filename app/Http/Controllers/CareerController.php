<?php

namespace App\Http\Controllers;

use App\Http\Requests\Career\CareerAddRequest;
use App\Http\Requests\Career\CareerIndexRequest;
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

    public function index(CareerIndexRequest $request)
    {
        $filters = $request->validatedWithDefaults();
        $careers = $this->service->getCareers($filters);

        return Inertia::render('Office/Career', [
            'careers' => $careers,
            'filter' => $filters,
        ]);
    }

    public function active()
    {
        // $careers = $this->service->getActiveCareers();

        // return Inertia::render('Career', ['careers' => $careers]);
    }

    // public function show(Career $carrer)
    // {
    //     return ApiResponse::success($carrer);
    // }

    public function store(CareerAddRequest $request)
    {
        try {
            $this->service->addCareer($request->validated());

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
            $this->service->updateCareer($career, $request->validated());

            return redirect()
                ->back()
                ->with('success', 'Career updated successfully');
        } catch (\Throwable $e) {
            return back()->with('error', 'Failed update Career');
        }
    }

    public function destroy(Career $career)
    {
        try {
            $this->service->deleteCareer($career);

            return redirect()
                ->back()
                ->with('success', 'Career deleted successfully');
        } catch (\Throwable $e) {
            return back()->with('error', 'Failed delete Career');
        }
    }

    public function restore(Career $career)
    {
        try {
            $this->service->restoreCareer($career);
            return redirect()
                ->back()
                ->with('success', 'Career restored successfully');
        } catch (\Throwable $e) {
            return back()->with('error', 'Failed restore Career');
        }
    }
}

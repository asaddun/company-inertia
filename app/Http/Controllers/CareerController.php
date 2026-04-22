<?php

namespace App\Http\Controllers;

use App\Http\Requests\Career\CareerAddRequest;
use App\Http\Requests\Career\CareerIndexRequest;
use App\Http\Requests\Career\CareerUpdateRequest;
use App\Models\Career;
use App\Services\CareerService;
use Inertia\Inertia;

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

        return Inertia::render('Portal/Career', [
            'careers' => $careers,
            'filter' => $filters,
            'defaultFilters' => $request::defaults(),
            'filterKeys' => ['search', 'type', 'status'],
        ]);
    }

    public function active()
    {
        $careers = $this->service->getActiveCareers();

        return Inertia::render('Career', ['careers' => $careers]);
    }

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
            return back()->with('error', $e ? 'Failed update Career, ' . $e->getMessage() : 'Failed update Career');
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
            return back()->with('error', $e ? 'Failed restore Career, ' . $e->getMessage() : 'Failed restore Career');
        }
    }

    public function forceDelete(Career $career)
    {
        try {
            $this->service->forceDeleteCareer($career);
            return redirect()
                ->back()
                ->with('success', 'Career deleted successfully');
        } catch (\Throwable $e) {
            return back()->with('error', $e ? 'Failed delete Career, ' . $e->getMessage() : 'Failed delete Career');
        }
    }
}

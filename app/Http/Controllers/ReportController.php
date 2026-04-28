<?php

namespace App\Http\Controllers;

use App\Http\Requests\Report\ReportIndexRequest;
use App\Http\Requests\Report\ReportStoreRequest;
use App\Http\Requests\ReportEditRequest;
use App\Models\JobType;
use App\Models\Report;
use App\Services\ReportService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    protected $service;

    public function __construct(ReportService $service)
    {
        $this->service = $service;
    }

    /**
     * Display a listing of the resource.
     */
    public function all(ReportIndexRequest $request)
    {
        $filters = $request->validatedWithDefaults();
        $query = Report::query();
        $reports = $this->service->getReports($query, $filters);
        return Inertia::render('Portal/Report/Reports', [
            'reports' => $reports,
            'context' => 'all',
            'filter' => $filters,
            'defaultFilters' => $request::defaults(),
            'filterKeys' => config('filter_keys'),
        ]);
    }

    public function my(ReportIndexRequest $request)
    {
        $filters = $request->validatedWithDefaults();
        $query = $request->user()->reports();
        $reports = $this->service->getReports($query, $filters);
        return Inertia::render('Portal/Report/Reports', [
            'reports' => $reports,
            'context' => 'my',
            'filter' => $filters,
            'defaultFilters' => $request::defaults(),
            'filterKeys' => config('filter_keys'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $types = JobType::all();
        return Inertia::render('Portal/Report/ReportInput', [
            'types' => $types,
            'jobFields' => config('job_fields')
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ReportStoreRequest $request)
    {
        try {
            $this->service->inputReport($request->user(), $request->validated());

            return redirect()
                ->route('reports.my')
                ->with('success', 'Report created successfully');
        } catch (\Throwable $e) {
            return back()->with('error', 'Failed create Report ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Report $report)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ReportEditRequest $request, Report $report)
    {
        $types = JobType::all();
        $report = $this->service->editReport($report);
        return Inertia::render('Portal/Report/ReportInput', [
            'report' => $report,
            'types' => $types,
            'jobFields' => config('job_fields')
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Report $report)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Report $report)
    {
        try {
            $this->service->deleteReport($report);

            return redirect()
                ->route('reports.my')
                ->with('success', 'Data deleted successfully');
        } catch (\Throwable $e) {
            return back()->with('error', $e ? 'Failed to delete Data, ' . $e->getMessage() : 'Failed to delete Data');
        }
    }

    public function restore(Report $report)
    {
        try {
            $this->service->restoreReport($report);

            return redirect()
                ->route('reports.my')
                ->with('success', 'Data restored successfully');
        } catch (\Throwable $e) {
            return back()->with('error', $e ? 'Failed to restore Data, ' . $e->getMessage() : 'Failed to restore Data');
        }
    }

    public function forceDelete(Report $report)
    {
        try {
            $this->service->forceDeleteReport($report);

            return redirect()
                ->route('reports.my')
                ->with('success', 'Data deleted successfully');
        } catch (\Throwable $e) {
            return back()->with('error', $e ? 'Failed to delete Data, ' . $e->getMessage() : 'Failed to delete Data');
        }
    }
}

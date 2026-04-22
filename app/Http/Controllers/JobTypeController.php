<?php

namespace App\Http\Controllers;

use App\Http\Requests\JobType\JobTypeBulkUpdateRequest;
use App\Http\Requests\JobType\JobTypeIndexRequest;
use App\Http\Requests\JobType\JobTypeUpdateRequest;
use App\Models\JobType;
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
            'defaultFilters' => $request::defaults(),
            'filterKeys' => ['search', 'status'],
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
    public function show(JobType $jobType)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(JobType $jobType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(JobTypeUpdateRequest $request, JobType $jobType)
    {
        try {
            $this->service->updateJobTypes($jobType, $request->validated());

            return redirect()
                ->route('job-types.index')
                ->with('success', 'Job Type updated successfully');
        } catch (\Throwable $e) {
            return back()->with('error', $e ? 'Failed to update Job Type, ' . $e->getMessage() : 'Failed to update Job Type');
        }
    }

    public function updateBulk(JobTypeBulkUpdateRequest $request, JobType $jobType)
    {
        try {
            $this->service->updateBulkJobTypes($request->validated('data'));

            return redirect()
                ->back()
                ->with('success', 'Job Type updated successfully');
        } catch (\Throwable $e) {
            return back()->with('error', $e ? 'Failed to update Job Type, ' . $e->getMessage() : 'Failed to update Job Type');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JobType $jobType)
    {
        try {
            $this->service->deleteJobType($jobType);

            return redirect()
                ->back()
                ->with('success', 'Data deleted successfully');
        } catch (\Throwable $e) {
            return back()->with('error', $e ? 'Failed to delete Data, ' . $e->getMessage() : 'Failed to delete Data');
        }
    }

    public function restore(JobType $jobType)
    {
        try {
            $this->service->restoreJobType($jobType);

            return redirect()
                ->back()
                ->with('success', 'Data restored successfully');
        } catch (\Throwable $e) {
            return back()->with('error', $e ? 'Failed to restore Data, ' . $e->getMessage() : 'Failed to restore Data');
        }
    }

    public function forceDelete(JobType $jobType)
    {
        try {
            $this->service->forceDeleteJobType($jobType);

            return redirect()
                ->back()
                ->with('success', 'Data deleted successfully');
        } catch (\Throwable $e) {
            return back()->with('error', $e ? 'Failed to delete Data, ' . $e->getMessage() : 'Failed to delete Data');
        }
    }
}

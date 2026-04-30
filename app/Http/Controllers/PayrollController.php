<?php

namespace App\Http\Controllers;

use App\Enums\PayrollStatus;
use App\Enums\UserLevel;
use App\Http\Requests\Payroll\PayrollIndexRequest;
use App\Http\Requests\Payroll\PayrollStatusRequest;
use App\Models\Payroll;
use App\Services\PayrollService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PayrollController extends Controller
{

    protected $service;

    public function __construct(PayrollService $service)
    {
        $this->service = $service;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(PayrollIndexRequest $request)
    {
        $filters = $request->validatedWithDefaults();
        $userLevel = $request->user()->level;
        if ($userLevel->atLeast(UserLevel::MANAGEMENT)) {
            $query = Payroll::query();
        } else {
            $query = $request->user()->payrolls();
        }
        $payrolls = $this->service->getPayrolls($query, $filters);
        return Inertia::render('Portal/Payroll/Payrolls', [
            'payrolls' => $payrolls['data'],
            'filter' => $filters,
            'defaultFilters' => $request::defaults(),
            'filterKeys' => config('filter_keys'),
            'counts' => $payrolls['counts'],
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
    public function show(Payroll $payroll)
    {
        $payroll = $this->service->getPayroll($payroll);
        // dd($payroll);
        return Inertia::render('Portal/Payroll/DetailPayroll', [
            'payroll' => $payroll,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Payroll $payroll)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Payroll $payroll)
    {
        //
    }

    public function status(PayrollStatusRequest $request, Payroll $payroll)
    {
        try {
            $newStatus = PayrollStatus::from($request->status);
            $this->service->updateStatus($payroll, $newStatus);
            return redirect()->route('payrolls.index')->with('success', 'Update Status successfully');
        } catch (\Throwable $e) {
            return back()->with('error', $e ? 'Failed to update Status, ' . $e->getMessage() : 'Failed to update Status');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payroll $payroll)
    {
        //
    }
}

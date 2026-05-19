<?php

namespace App\Services;

use App\Enums\PayrollStatus;
use App\Enums\UserLevel;
use App\Models\Payroll;
use App\Models\Report;
use App\Models\User;
use Carbon\Carbon;
use Inertia\Inertia;

class DashboardService
{
    public function getManagementDashboard()
    {
        $previousWeek = Carbon::now()->subWeek();

        $previousWeekCode = $previousWeek->isoWeekYear
            . 'W'
            . str_pad($previousWeek->isoWeek, 2, '0', STR_PAD_LEFT);

        return Inertia::render('Portal/Dashboard/Management', [
            'summaryCards' => [
                [
                    'title' => 'Submitted Payrolls',
                    'value' => Payroll::where('status', PayrollStatus::SUBMITTED)->count(),
                    'link' => 'payrolls.index',
                ],
                [
                    'title' => 'Last Week Gross Income',
                    'value' => '$' . Report::where('week_code', $previousWeekCode)->sum('stored'),
                    'link' => 'reports.all',
                ],
                [
                    'title' => 'Employees',
                    'value' => User::where('level', '!=', UserLevel::MEMBER)->count(),
                    'link' => 'users.index',
                ],
                [
                    'title' => 'New Applicants',
                    'value' => '0',
                ],
            ],

            // 'payrollChart' => Inertia::defer(
            //     fn() =>
            //     $this->payrollChart()
            // ),
        ]);
    }

    public function getEmployeeDashboard()
    {
        return Inertia::render('Portal/Dashboard/Employee');
    }

    public function getMemberDashboard()
    {
        return Inertia::render('Portal/Dashboard/Member');
    }
}

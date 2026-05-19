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
                    'params' => [
                        'type' => PayrollStatus::SUBMITTED->value
                    ]
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

            'weeklyQuantityChart' => Inertia::defer(
                fn() => $this->weeklyQuantityChart()
            ),
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

    private function weeklyQuantityChart(): array
    {
        $reports = Report::query()
            ->selectRaw('
            week_code,
            job_type_id,
            SUM(quantity) as total_qty
        ')
            ->with('jobType:id,name')
            ->groupBy('week_code', 'job_type_id')
            ->orderBy('week_code')
            ->get();

        $series = $reports
            ->pluck('jobType.name')
            ->unique()
            ->values();

        $chartData = [];

        foreach ($reports as $report) {

            $week = $report->week_code;
            $jobType = $report->jobType->name;

            if (! isset($chartData[$week])) {

                $chartData[$week] = [
                    'week_code' => $week,
                ];
            }

            $chartData[$week][$jobType] = (int) $report->total_qty;
        }

        // isi missing value dengan 0
        foreach ($chartData as &$weekData) {

            foreach ($series as $seriesName) {

                $weekData[$seriesName] ??= 0;
            }
        }

        return [
            'series' => $series,
            'data' => array_values($chartData),
        ];
    }
}

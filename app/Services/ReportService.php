<?php

namespace App\Services;

use App\Models\JobType;
use App\Models\Payroll;
use App\Models\Report;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\QueryException;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class ReportService
{
    public function getReports($query, $filters): LengthAwarePaginator
    {
        $query
            ->with('jobType:id,name,unit_label')
            ->with('user:id,name');

        // Status
        if ($filters['status'] === 'trash') {
            $query->onlyTrashed();
        }

        // Search
        if ($filters['search']) {
            $query->where(function ($q) use ($filters) {
                $q->whereHas('user', function ($q2) use ($filters) {
                    $q2->where('name', 'like', '%' . $filters['search'] . '%');
                })
                    ->orWhereHas('jobType', function ($q2) use ($filters) {
                        $q2->where('name', 'like', '%' . $filters['search'] . '%');
                    });
            });
        }

        // Date
        if ($filters['date']) {
            $query->whereDate('work_date', $filters['date']);
        }

        // Range
        if ($filters['range']) {
            $query->whereBetween('work_date', $filters['range']);
        }

        // Sort
        if ($filters['sort']) {
            $direction = str_starts_with($filters['sort'], '-') ? 'desc' : 'asc';
            $column = ltrim($filters['sort'], '-');

            $query->orderBy($column, $direction);
        }

        return $query->paginate($filters['per_page'])->withQueryString();
    }

    public function inputReport(User $user, array $data): Report
    {
        $userId = $user->id;
        return DB::transaction(function () use ($userId, $data) {
            $jobType = JobType::findOrFail($data['job_type_id']);

            $quantity = (int) $data['quantity'];
            if ($quantity <= 0) {
                throw new \InvalidArgumentException('Quantity must be greater than 0');
            }

            $wagePerItem = $jobType->wage_per_item;
            $wageAmount = $quantity * $wagePerItem;

            if ($jobType->current_price > 0) {
                $pricePerItem = $jobType->current_price;
                $expectedStored = $data['quantity'] * $pricePerItem;
                $stored = $data['stored'] ?? 0;

                if ($stored > $expectedStored) {
                    $bonus = ($stored - $expectedStored) * 0.75;
                    $wageAmount += $bonus;
                } elseif ($stored < $expectedStored) {
                    $penalty = $expectedStored - $stored;
                    $wageAmount -= $penalty;
                }
            }

            $workDateCarbon = Carbon::parse($data['work_date']);
            $workDate = $workDateCarbon->toDateString();

            $weekCode = $workDateCarbon->isoWeekYear
                . 'W'
                . str_pad($workDateCarbon->isoWeek, 2, '0', STR_PAD_LEFT);

            try {
                $payroll = Payroll::create([
                    'user_id'           => $userId,
                    'week_code'         => $weekCode,
                    'total_wage_amount' => 0,
                    'status'            => 'draft',
                ]);
            } catch (QueryException $e) {
                // kalau tabrakan unique key → ambil row yang menang
                $payroll = Payroll::where('user_id', $userId)
                    ->where('week_code', $weekCode)
                    ->first();

                if (! $payroll) {
                    throw new \RuntimeException('Payroll not found');
                }

                if ($payroll->status !== 'draft') {
                    throw new \DomainException('Payroll no longer in draft');
                }
            }

            $report = Report::withTrashed()->updateOrCreate(
                // Kondisi pencarian (unique key)
                [
                    'user_id'     => $userId,
                    'job_type_id' => $jobType->id,
                    'work_date'   => $workDate,
                ],

                // Data yang di-update / di-insert
                [
                    'week_code'      => $weekCode,
                    'payroll_id'     => $payroll->id,
                    'quantity'       => $quantity,
                    'expected'       => $expectedStored ?? null,
                    'stored'         => $data['stored'] ?? null,
                    'bonus'          => $bonus ?? null,
                    'wage_amount'    => $wageAmount,
                ]
            );

            // Restore jika ada di trash
            if ($report->trashed()) {
                $report->restore();
            }

            app(PayrollService::class)->recalculate($payroll->id);
            return $report;
        });
    }

    public function editReport(Report $report)
    {
        return $report->load('jobType:id,name,unit_label');
    }

    public function deleteReport(Report $report)
    {
        $payrollId = $report->payroll_id;
        $report->delete();
        app(PayrollService::class)->recalculate($payrollId);
        return $report;
    }

    public function restoreReport(Report $report)
    {
        if (!$report->trashed()) {
            throw new \Exception('Report is not deleted');
        }
        $report->restore();
        app(PayrollService::class)->recalculate($report->payroll_id);
        return $report;
    }

    public function forceDeleteReport(Report $report)
    {
        if (!$report->trashed()) {
            throw new \Exception('Report is not deleted');
        }
        return $report->forceDelete();
    }
}

<?php

namespace App\Services;

use App\Enums\PayrollStatus;
use App\Models\Payroll;
use App\Models\Report;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;

class PayrollService
{
    public function recalculate(int $payrollId): void
    {
        $payroll = Payroll::find($payrollId);

        if (!$payroll || $payroll->status !== PayrollStatus::DRAFT) {
            return; // jangan update kalau sudah complete / paid
        }

        $total = Report::where('payroll_id', $payroll->id)->sum('wage_amount');
        $payroll->update([
            'total_wage_amount' => $total,
        ]);
    }

    public function getPayrolls($query, array $filters): array
    {
        $query
            // ->with('report')
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
                });
            });
        }

        // Type
        if ($filters['type'] && $filters['type'] != 'all') {
            $query->where('status', $filters['type']);
        }

        // Date
        if ($filters['date']) {
            $workDateCarbon = Carbon::parse($filters['date']);

            $weekCode = $workDateCarbon->isoWeekYear
                . 'W'
                . str_pad($workDateCarbon->isoWeek, 2, '0', STR_PAD_LEFT);

            $query->where('week_code', $weekCode);
        }

        $countQuery = clone $query;

        // Sort
        if ($filters['sort']) {
            $direction = str_starts_with($filters['sort'], '-') ? 'desc' : 'asc';
            $column = ltrim($filters['sort'], '-');

            $query->orderBy($column, $direction);
        }

        // Pagination
        $payrolls = $query
            ->paginate($filters['per_page'] ?? 10)
            ->withQueryString();

        // 🔥 Count pakai groupBy
        $countsRaw = $countQuery
            ->selectRaw('status, COUNT(*) as total')
            ->groupBy('status')
            ->pluck('total', 'status');

        $counts = [
            'all' => $countsRaw->sum(),
            'draft' => $countsRaw['draft'] ?? 0,
            'submitted' => $countsRaw['submitted'] ?? 0,
            'approved' => $countsRaw['approved'] ?? 0,
            'paid' => $countsRaw['paid'] ?? 0,
        ];

        return [
            'data' => $payrolls,
            'counts' => $counts,
        ];
    }

    public function getPayroll(Payroll $payroll): Payroll
    {
        return $payroll->load([
            'reports.payroll:id,status',
            'reports.jobType:id,name,unit_label',
            'reports.user:id,name',
            'user:id,name'
        ]);
    }

    public function updateStatus(Payroll $payroll, PayrollStatus $newStatus): Payroll
    {
        $current = $payroll->status;

        if (!$current->canTransitionTo($newStatus)) {
            throw new \Exception("Invalid transition");
        }

        $payroll->update([
            'status' => $newStatus,
        ]);

        return $payroll;
    }
}

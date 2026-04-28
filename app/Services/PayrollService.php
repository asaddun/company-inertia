<?php

namespace App\Services;

use App\Models\Payroll;
use App\Models\Report;

class PayrollService
{
    public function recalculate(int $payrollId): void
    {
        $payroll = Payroll::find($payrollId);

        if (!$payroll || $payroll->status !== 'draft') {
            return; // jangan update kalau sudah complete / paid
        }

        $total = Report::where('payroll_id', $payroll->id)->sum('wage_amount');
        $payroll->update([
            'total_wage_amount' => $total,
        ]);
    }
}

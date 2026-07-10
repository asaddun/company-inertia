<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::table('reports')
            ->join('job_types', 'reports.job_type_id', '=', 'job_types.id')
            ->update([
                'reports.wage_per_item'  => DB::raw('job_types.wage_per_item'),
                'reports.price_per_item' => DB::raw('job_types.current_price'),
            ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('reports')->update([
            'wage_per_item' => null,
            'price_per_item' => null,
        ]);
    }
};

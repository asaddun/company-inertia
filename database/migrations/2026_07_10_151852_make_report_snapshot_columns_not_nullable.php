<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (DB::table('reports')->whereNull('wage_per_item')->exists()) {
            throw new RuntimeException(
                'Backfill incomplete: reports.wage_per_item still contains NULL values.'
            );
        }

        if (DB::table('reports')->whereNull('price_per_item')->exists()) {
            throw new RuntimeException(
                'Backfill incomplete: reports.price_per_item still contains NULL values.'
            );
        }

        Schema::table('reports', function (Blueprint $table) {
            $table->decimal('wage_per_item', 5, 2)
                ->nullable(false)
                ->change();

            $table->decimal('price_per_item', 5, 2)
                ->nullable(false)
                ->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('reports', function (Blueprint $table) {
            $table->decimal('wage_per_item', 5, 2)
                ->nullable()
                ->change();

            $table->decimal('price_per_item', 5, 2)
                ->nullable()
                ->change();
        });
    }
};

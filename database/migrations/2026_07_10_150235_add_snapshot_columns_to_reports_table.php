<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('reports', function (Blueprint $table) {
            $table->decimal('wage_per_item', 5, 2)->nullable()->after('stored');
            $table->decimal('price_per_item', 5, 2)->nullable()->after('wage_per_item');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('reports', function (Blueprint $table) {
            $table->dropColumn([
                'wage_per_item',
                'price_per_item',
            ]);
        });
    }
};

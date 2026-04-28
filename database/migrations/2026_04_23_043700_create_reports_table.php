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
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('payroll_id')
                ->constrained('payrolls')
                ->cascadeOnDelete();

            $table->foreignId('job_type_id')
                ->constrained('job_types')
                ->restrictOnDelete();

            $table->date('work_date');
            $table->char('week_code', 7);

            $table->unsignedInteger('quantity');
            $table->decimal('expected', 8, 2)->nullable();
            $table->decimal('stored', 8, 2)->nullable();
            $table->decimal('bonus', 8, 2)->nullable();
            $table->decimal('wage_amount', 14, 2); // qty x rate

            $table->boolean('is_locked')->default(false);
            $table->softDeletes();
            $table->timestamps();

            // index penting
            $table->index(['user_id', 'week_code']);
            $table->index(['job_type_id']);

            $table->unique(['user_id', 'job_type_id', 'work_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};

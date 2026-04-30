<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CareerController;
use App\Http\Controllers\JobTypeController;
use App\Http\Controllers\PayrollController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/login', [AuthController::class, 'create'])->name('login');
Route::post('/login', [AuthController::class, 'store'])->name('login.store');

Route::get('/career', [CareerController::class, 'active'])->name('careers.active');

Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'destroy'])->name('logout');

    Route::prefix('portal')->group(function () {
        Route::get('/', function () {
            return Inertia::render('Portal/Dashboard');
        })->name('portal.dashboard');

        // User
        Route::get('/users', [UserController::class, 'index'])->name('users.index');
        Route::post('/users', [UserController::class, 'store'])->name('users.store');
        Route::put('/users/{user}', [UserController::class, 'update'])->withTrashed()->name('users.update');
        Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
        Route::put('/users/{user}/restore', [UserController::class, 'restore'])->withTrashed()->name('users.restore');
        Route::delete('/users/{user}/force', [UserController::class, 'forceDelete'])->withTrashed()->name('users.forceDelete');

        // Report
        Route::get('/reports', [ReportController::class, 'all'])->name('reports.all');
        Route::get('/reports/my', [ReportController::class, 'my'])->name('reports.my');
        Route::get('/reports/create', [ReportController::class, 'create'])->name('reports.create');
        Route::post('/reports', [ReportController::class, 'store'])->name('reports.store');
        Route::get('/reports/{report}/edit', [ReportController::class, 'edit'])->name('reports.edit');
        Route::put('/reports/{report}', [ReportController::class, 'update'])->withTrashed()->name('reports.update');
        Route::delete('/reports/{report}', [ReportController::class, 'destroy'])->name('reports.destroy');
        Route::put('/reports/{report}/restore', [ReportController::class, 'restore'])->withTrashed()->name('reports.restore');
        Route::delete('/reports/{report}/force', [ReportController::class, 'forceDelete'])->withTrashed()->name('reports.forceDelete');

        // Payroll
        Route::get('/payrolls', [PayrollController::class, 'index'])->name('payrolls.index');
        Route::get('/payrolls/{payroll}', [PayrollController::class, 'show'])->name('payrolls.show');
        Route::patch('/payrolls/{payroll}/status', [PayrollController::class, 'status'])->withTrashed()->name('payrolls.status');
        Route::delete('/payrolls/{payroll}', [PayrollController::class, 'destroy'])->name('payrolls.destroy');
        Route::put('/payrolls/{payroll}/restore', [PayrollController::class, 'restore'])->withTrashed()->name('payrolls.restore');
        Route::delete('/payrolls/{payroll}/force', [PayrollController::class, 'forceDelete'])->withTrashed()->name('payrolls.forceDelete');

        // Career
        Route::get('/careers', [CareerController::class, 'index'])->name('careers.index');
        Route::post('/careers', [CareerController::class, 'store'])->name('careers.store');
        Route::get('/careers/{career}', [CareerController::class, 'show'])->name('careers.show');
        Route::put('/careers/{career}', [CareerController::class, 'update'])->withTrashed()->name('careers.update');
        Route::delete('/careers/{career}', [CareerController::class, 'destroy'])->name('careers.destroy');
        Route::put('/careers/{career}/restore', [CareerController::class, 'restore'])->withTrashed()->name('careers.restore');
        Route::delete('/careers/{career}/force', [CareerController::class, 'forceDelete'])->withTrashed()->name('careers.forceDelete');

        // Configuration
        Route::prefix('config')->group(function () {
            // Job Type
            Route::get('/job-type', [JobTypeController::class, 'index'])->name('job-types.index');
            Route::post('/job-type', [JobTypeController::class, 'store'])->name('job-types.store');
            Route::put('/job-type/{jobType}', [JobTypeController::class, 'update'])->name('job-types.update');
            Route::put('/job-type/update-bulk', [JobTypeController::class, 'updateBulk'])->name('job-types.update-bulk');
            Route::delete('/job-type/{jobType}', [JobTypeController::class, 'destroy'])->name('job-types.destroy');
            Route::put('/job-type/{jobType}/restore', [JobTypeController::class, 'restore'])->withTrashed()->name('job-types.restore');
            Route::delete('/job-type/{jobType}/force', [JobTypeController::class, 'forceDelete'])->withTrashed()->name('job-types.forceDelete');
        });
    });
});

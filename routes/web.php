<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CareerController;
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

        // Career
        Route::get('/careers', [CareerController::class, 'index'])->name('careers.index');
        Route::post('/careers', [CareerController::class, 'store'])->name('careers.store');
        Route::get('/careers/{career}', [CareerController::class, 'show'])->name('careers.show');
        Route::put('/careers/{career}', [CareerController::class, 'update'])->withTrashed()->name('careers.update');
        Route::delete('/careers/{career}', [CareerController::class, 'destroy'])->name('careers.destroy');
        Route::put('/careers/{career}/restore', [CareerController::class, 'restore'])->withTrashed()->name('careers.restore');
        Route::delete('/careers/{career}/force', [CareerController::class, 'forceDelete'])->withTrashed()->name('careers.forceDelete');
    });
});

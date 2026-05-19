<?php

namespace App\Http\Controllers;

use App\Enums\UserLevel;
use App\Services\DashboardService;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    protected $service;

    public function __construct(DashboardService $service)
    {
        $this->service = $service;
    }

    public function index(Request $request)
    {
        $user = $request->user();
        if ($user->level->atLeast(UserLevel::MANAGEMENT)) {
            return $this->service->getManagementDashboard();
        } elseif ($user->level === UserLevel::EMPLOYEE) {
            return $this->service->getEmployeeDashboard();
        } elseif ($user->level === UserLevel::MEMBER) {
            return $this->service->getMemberDashboard();
        }

        abort(403);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\IConfigDisplayTVService;
use Illuminate\Http\Request;

class ConfigDisplayTVController extends Controller
{
    function __construct(protected IConfigDisplayTVService $configDisplayTVService)
    {
    }

    function getLineOfAccount()
    {
        return $this->configDisplayTVService->getLineOfAccount();
    }

    function saveChange(Request $request)
    {
        $username = $request->username;
        $departmentCode = $request->departmentCode;

        return $this->configDisplayTVService->saveChange($username, $departmentCode);
    }
}
<?php

namespace App\Providers;

use App\Services\AuthService;
use App\Services\IAuthService;
use App\Services\IKaizenTopMonthService;
use App\Services\KaizenTopMonthService;
use App\Services\IConfigDisplayTVService;
use App\Services\ConfigDisplayTVService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(IAuthService::class, AuthService::class);
        $this->app->bind(IKaizenTopMonthService::class, KaizenTopMonthService::class);
        $this->app->bind(IConfigDisplayTVService::class, ConfigDisplayTVService::class);
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}

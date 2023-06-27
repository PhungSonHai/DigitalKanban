<?php

namespace App\Http\Middleware;

use App\Services\IAuthService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VerifyAccessTokenMES
{
    function __construct(protected IAuthService $authService)
    {
    }
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!env('APP_DEV', false)) {
            $access_token = $request->header("access_token");

            if (!$access_token || !$this->authService->checkToken($access_token)) {
                return abort(404, "Not found");
            }
        }

        return $next($request);
    }
}

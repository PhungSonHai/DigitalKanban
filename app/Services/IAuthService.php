<?php

namespace App\Services;

interface IAuthService 
{
    public function checkToken(string $token): bool;
}

<?php

namespace App\Services;

use App\Models\UserToken;

class AuthService implements IAuthService
{
    public function __construct(protected UserToken $userToken)
    {
    }

    public function checkToken(string $token): bool
    {
        if(!$this->userToken::query()->where('UserToken', $token)->first()){
            return false;
        }
        return true;
    }
}

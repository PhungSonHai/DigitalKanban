<?php

namespace App\Services;

interface IConfigDisplayTVService
{
    function saveChange($username, $departmentCode);
    function getLineOfAccount();
}
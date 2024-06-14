<?php

namespace App\Services;

use App\Models\APHLineOfAccount;
use Carbon\Carbon;
use Exception;

class ConfigDisplayTVService implements IConfigDisplayTVService
{
    function __construct(protected APHLineOfAccount $APHLineOfAccount)
    {
    }

    function getLineOfAccount()
    {
        return $this->APHLineOfAccount::get();
    }

    function saveChange($username, $departmentCode)
    {
        try {
            if(!$username) {
                throw new \Exception("Không xác định được tài khoản cấu hình");
            }

            $this->APHLineOfAccount::where("username", $username)->delete();

            $data = [];
            foreach($departmentCode as $deptCode) {
                array_push($data, [ "USERNAME" => $username, "LINE_CODE" => $deptCode ]);
            }

            $this->APHLineOfAccount::insert($data);

            return ["status" => true, "message" => "Save successfully"];
        } catch (Exception $e) {
            return ["status" => false, "message" => $e->getMessage()];
        }
    }
}
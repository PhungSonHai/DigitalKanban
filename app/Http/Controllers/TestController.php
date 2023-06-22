<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TestController extends Controller
{
    public function __construct(protected DB $db)
    {
    }
    public function index()
    {
        return $this->db::table("hr001m")->where('id', 4382)->first();
    }
}

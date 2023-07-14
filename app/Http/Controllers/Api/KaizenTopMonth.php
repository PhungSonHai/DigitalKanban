<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\IKaizenTopMonthService;
use Illuminate\Http\Request;

class KaizenTopMonth extends Controller
{
    function __construct(protected IKaizenTopMonthService $kaizenTopMonthService)
    {
    }

    function add(Request $request)
    {
        $order  = $request->order;
        $month  = $request->month;
        $year  = $request->year;
        $avatar  = $request->file('avatar');
        $name  = $request->name;
        $msnv  = $request->msnv;
        $derpartment  = $request->derpartment;
        $plant  = $request->plant;
        $after_image  = $request->file('after_image');
        $after_description  = $request->after_description;
        $current_image  = $request->file('current_image');
        $current_description  = $request->current_description;
        $benefit  = $request->benefit;
        $upgrade_0  = $request->upgrade_0 === "true";
        $upgrade_1  = $request->upgrade_1 === "true";
        $upgrade_2  = $request->upgrade_2 === "true";
        $upgrade_3  = $request->upgrade_3 === "true";
        $upgrade_4  = $request->upgrade_4 === "true";
        $upgrade_5  = $request->upgrade_5 === "true";
        $upgrade_6  = $request->upgrade_6 === "true";
        $line_at  = $request->line_at;
        $plant_at  = $request->plant_at;
        $process_at  = $request->process_at;
        $start_at  = $request->start_at;

        return $this->kaizenTopMonthService->add($order, $month, $year, $avatar, $name, $msnv, $derpartment, $plant, $after_image, $after_description, $current_image, $current_description, $benefit, $upgrade_0, $upgrade_1, $upgrade_2, $upgrade_3, $upgrade_4, $upgrade_5, $upgrade_6, $line_at, $plant_at, $process_at, $start_at);
    }

    function get(Request $request)
    {
        $month = $request->month;
        $year = $request->year;
        return $this->kaizenTopMonthService->get($month, $year);
    }

    function delete(Request $request)
    {
        $id = $request->id;
        return $this->kaizenTopMonthService->delete($id);
    }

    function update(Request $request)
    {
        $id  = $request->id;
        $order  = $request->order;
        $month  = $request->month;
        $year  = $request->year;
        $name  = $request->name;
        $msnv  = $request->msnv;
        $derpartment  = $request->derpartment;
        $plant  = $request->plant;
        $after_description  = $request->after_description;
        $current_description  = $request->current_description;
        $benefit  = $request->benefit;
        $upgrade_0  = $request->upgrade_0 === "true";
        $upgrade_1  = $request->upgrade_1 === "true";
        $upgrade_2  = $request->upgrade_2 === "true";
        $upgrade_3  = $request->upgrade_3 === "true";
        $upgrade_4  = $request->upgrade_4 === "true";
        $upgrade_5  = $request->upgrade_5 === "true";
        $upgrade_6  = $request->upgrade_6 === "true";
        $line_at  = $request->line_at;
        $plant_at  = $request->plant_at;
        $process_at  = $request->process_at;
        $start_at  = $request->start_at;

        return $this->kaizenTopMonthService->update($id, $order, $month, $year, $name, $msnv, $derpartment, $plant, $after_description, $current_description, $benefit, $upgrade_0, $upgrade_1, $upgrade_2, $upgrade_3, $upgrade_4, $upgrade_5, $upgrade_6, $line_at, $plant_at, $process_at, $start_at);
    }
}

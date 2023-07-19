<?php

namespace App\Services;

use App\Models\APHKaizenMonth;
use Carbon\Carbon;
use Exception;

class KaizenTopMonthService implements IKaizenTopMonthService
{
    function __construct(protected APHKaizenMonth $APHKaizenMonth)
    {
    }

    function add($order, $month, $year, $avatar, $name, $msnv, $derpartment, $plant, $after_image, $after_description, $current_image, $current_description, $benefit, $upgrade_0, $upgrade_1, $upgrade_2, $upgrade_3, $upgrade_4, $upgrade_5, $upgrade_6, $line_at, $plant_at, $process_at, $start_at): array
    {
        $avatarName = md5(time() . uniqid()) . "." . $avatar->getClientOriginalExtension();
        $afterName = md5(time() . uniqid()) . "." . $after_image->getClientOriginalExtension();
        $currentName = md5(time() . uniqid()) . "." . $current_image->getClientOriginalExtension();
        try {
            // check order, month, year exist
            $exist = $this->APHKaizenMonth::query()->where(['kaizen_order' => $order, 'kaizen_month' => $month, 'kaizen_year' => $year]);

            if ($exist->first()) {
                throw new \Exception("Lỗi! Vị trí {$order} đã có trong tháng {$month} của năm {$year}, vui lòng chọn vị trí khác");
            }

            $avatar->move(public_path('uploads'), $avatarName);
            $after_image->move(public_path('uploads'), $afterName);
            $current_image->move(public_path('uploads'), $currentName);

            $this->APHKaizenMonth::query()->create([
                'KAIZEN_ORDER' => $order,
                'KAIZEN_YEAR' => $year,
                'KAIZEN_MONTH' => $month,
                'PATH_AVATAR' => $avatarName,
                'NAME' => $name,
                'MSNV' => $msnv,
                'DEPARTMENT' => $derpartment,
                'PLANT' => $plant,
                'AFTER_IMAGE' => $afterName,
                'AFTER_DESCRIPTION' => $after_description,
                'CURRENT_IMAGE' => $currentName,
                'CURRENT_DESCRIPTION' => $current_description,
                'BENEFIT' => $benefit,
                'UPGRADE_0' => $upgrade_0,
                'UPGRADE_1' => $upgrade_1,
                'UPGRADE_2' => $upgrade_2,
                'UPGRADE_3' => $upgrade_3,
                'UPGRADE_4' => $upgrade_4,
                'UPGRADE_5' => $upgrade_5,
                'UPGRADE_6' => $upgrade_6,
                'LINE_AT' => $line_at,
                'PLANT_AT' => $plant_at,
                'PROCESS_AT' => $process_at,
                'START_AT' => Carbon::createFromFormat('Y-m-d', $start_at)->format('Y/m/d')
            ]);
        } catch (Exception $e) {
            @unlink(public_path('uploads') . "/" . $avatarName);
            @unlink(public_path('uploads') . "/" . $afterName);
            @unlink(public_path('uploads') . "/" . $currentName);
            return ["status" => false, "message" => $e->getMessage()];
        }

        return ["status" => true, "message" => "Thêm kaizen thành công!"];
    }

    function get($month, $year)
    {
        return $this->APHKaizenMonth::query()->where([['KAIZEN_MONTH', $month], ['KAIZEN_YEAR', $year]])->orderBy('KAIZEN_ORDER', 'asc')->get()->toArray();
    }

    function delete($id): array
    {
        try {
            $exist = $this->APHKaizenMonth::query()->where("id", $id);
            if (!$exist->first()) {
                throw new Exception("Không tìm thấy dữ liệu này, xoá không được");
            }

            $data = $exist->first();

            $avatarName = $data->path_avatar;
            $afterName = $data->after_image;
            $currentName = $data->current_image;
            @unlink(public_path('uploads') . "/" . $avatarName);
            @unlink(public_path('uploads') . "/" . $afterName);
            @unlink(public_path('uploads') . "/" . $currentName);
            $exist->delete();
        } catch (Exception $e) {
            return ["status" => false, "message" => $e->getMessage()];
        }
        return ["status" => true, "message" => "Xoá kaizen thành công!"];
    }

    function update($id, $order, $month, $year, $name, $msnv, $derpartment, $plant, $after_description, $current_description, $benefit, $upgrade_0, $upgrade_1, $upgrade_2, $upgrade_3, $upgrade_4, $upgrade_5, $upgrade_6, $line_at, $plant_at, $process_at, $start_at)
    {
        try {

            $exist = $this->APHKaizenMonth::query()->where('ID', $id);
            if (!$exist->first()) {
                throw new \Exception("Không tìm thấy dữ liệu này, vui lòng kiểm tra lại có ai đã xoá nó trước đó! ~");
            }

            $validOrder = $this->APHKaizenMonth::query()->where([['ID', '<>', $id], ['KAIZEN_ORDER', $order], ['KAIZEN_MONTH', $month], ['KAIZEN_YEAR', $year]]);
            if($validOrder->first()){
                throw new \Exception("Lỗi! Vị trí {$order} đã có trong tháng {$month} của năm {$year}, vui lòng chọn vị trí khác");
            }

            $exist->update([
                'KAIZEN_ORDER' => $order,
                'KAIZEN_YEAR' => $year,
                'KAIZEN_MONTH' => $month,
                'NAME' => $name,
                'MSNV' => $msnv,
                'DEPARTMENT' => $derpartment,
                'PLANT' => $plant,
                'AFTER_DESCRIPTION' => $after_description,
                'CURRENT_DESCRIPTION' => $current_description,
                'BENEFIT' => $benefit,
                'UPGRADE_0' => $upgrade_0,
                'UPGRADE_1' => $upgrade_1,
                'UPGRADE_2' => $upgrade_2,
                'UPGRADE_3' => $upgrade_3,
                'UPGRADE_4' => $upgrade_4,
                'UPGRADE_5' => $upgrade_5,
                'UPGRADE_6' => $upgrade_6,
                'LINE_AT' => $line_at,
                'PLANT_AT' => $plant_at,
                'PROCESS_AT' => $process_at,
                'START_AT' => Carbon::createFromFormat('Y-m-d', $start_at)->format('Y/m/d')
            ]);
        } catch (Exception $e) {
            return ["status" => false, "message" => $e->getMessage()];
        }

        return ["status" => true, "message" => "Cập nhật thông tin kaizen thành công!"];
    }
}

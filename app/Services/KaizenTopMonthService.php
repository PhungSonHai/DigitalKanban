<?php

namespace App\Services;

use App\Models\APHKaizenMonth;
use Exception;

class KaizenTopMonthService implements IKaizenTopMonthService
{
    function __construct(protected APHKaizenMonth $APHKaizenMonth)
    {
    }

    function add($order, $month, $year, $avatar, $name, $msnv, $derpartment, $plant, $after_image, $after_description, $current_image, $current_description, $benefit, $upgrade_0, $upgrade_1, $upgrade_2, $upgrade_3, $upgrade_4, $upgrade_5, $upgrade_6, $line_at, $plant_at, $process_at, $start_at): array
    {
        try {
            // check order, month, year exist
            $exist = $this->APHKaizenMonth::query()->where(['order' => $order, 'month' => $month, 'year' => $year]);

            if ($exist) {
                throw new \Exception("Lỗi! Vị trí {$order} đã có trong tháng {$month} của năm {$year}, vui lòng chọn vị trí khác");
            }

            if (file_exists(public_path('uploads') . "/" . $avatar->getClientOriginalName())) {
                throw new Exception("Tệp tin hình ảnh của \"nhân viên\" đã trùng tên với ảnh trước đây, vui lòng đổi tên của ảnh lại rồi tiếp tục thực hiện");
            }

            $avatar->move(public_path('uploads'), $avatar->getClientOriginalName());

            if (file_exists(public_path('uploads') . "/" . $after_image->getClientOriginalName())) {
                @unlink(public_path('uploads') . "/" . $avatar->getClientOriginalName());
                throw new Exception("Tệp tin hình ảnh của \"hình ảnh trước đây\" đã trùng tên với ảnh trước đây, vui lòng đổi tên của ảnh lại rồi tiếp tục thực hiện");
            }

            $after_image->move(public_path('uploads'), $after_image->getClientOriginalName());

            if (file_exists(public_path('uploads') . "/" . $current_image->getClientOriginalName())) {
                @unlink(public_path('uploads') . "/" . $avatar->getClientOriginalName());
                @unlink(public_path('uploads') . "/" . $after_image->getClientOriginalName());
                throw new Exception("Tệp tin hình ảnh của \"ảnh hiện tại\" đã trùng tên với ảnh trước đây, vui lòng đổi tên của ảnh lại rồi tiếp tục thực hiện");
            }

            $current_image->move(public_path('uploads'), $current_image->getClientOriginalName());

            $this->APHKaizenMonth::query()->create([
                'kaizen_order' => $order,
                'kaizen_year' => $year,
                'kaizen_month' => $month,
                'path_avatar' => $avatar->getClientOriginalName(),
                'name' => $name,
                'msnv' => $msnv,
                'department' => $derpartment,
                'plant' => $plant,
                'after_image' => $after_image->getClientOriginalName(),
                'after_description' => $after_description,
                'current_image' => $current_image->getClientOriginalName(),
                'current_description' => $current_description,
                'benefit' => $benefit,
                'upgrade_0' => $upgrade_0,
                'upgrade_1' => $upgrade_1,
                'upgrade_2' => $upgrade_2,
                'upgrade_3' => $upgrade_3,
                'upgrade_4' => $upgrade_4,
                'upgrade_5' => $upgrade_5,
                'upgrade_6' => $upgrade_6,
                'line_at' => $line_at,
                'plant_at' => $plant_at,
                'process_at' => $process_at,
                'start_at' => $start_at
            ]);
        } catch (Exception $e) {
            return ["status" => false, "message" => $e->getMessage()];
        }

        return ["status" => true, "message" => "Thêm kaizen thành công!"];
    }
}

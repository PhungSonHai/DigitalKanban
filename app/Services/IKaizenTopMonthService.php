<?php

namespace App\Services;

interface IKaizenTopMonthService
{
    function add($order, $month, $year, $avatar, $name, $msnv, $derpartment, $plant, $after_image, $after_description, $current_image, $current_description, $benefit, $upgrade_0, $upgrade_1, $upgrade_2, $upgrade_3, $upgrade_4, $upgrade_5, $upgrade_6, $line_at, $plant_at, $process_at, $start_at): array;

    function get($month, $year);

    function delete($id): array;

    function update($id, $order, $month, $year, $name, $msnv, $derpartment, $plant, $after_description, $current_description, $benefit, $upgrade_0, $upgrade_1, $upgrade_2, $upgrade_3, $upgrade_4, $upgrade_5, $upgrade_6, $line_at, $plant_at, $process_at, $start_at);
}

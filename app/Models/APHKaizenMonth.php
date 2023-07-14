<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class APHKaizenMonth extends Model
{
    use HasFactory;

    protected $table = 'APH_KAIZEN_MONTH3';
    protected $primaryKey = 'ID';
    const CREATED_AT = 'CREATED_AT';
    const UPDATED_AT = 'UPDATED_AT';

    protected $fillable = [
        'KAIZEN_ORDER',
        'KAIZEN_YEAR',
        'KAIZEN_MONTH',
        'PATH_AVATAR',
        'NAME',
        'MSNV',
        'DEPARTMENT',
        'PLANT',
        'AFTER_IMAGE',
        'AFTER_DESCRIPTION',
        'CURRENT_IMAGE',
        'CURRENT_DESCRIPTION',
        'BENEFIT',
        'UPGRADE_0',
        'UPGRADE_1',
        'UPGRADE_2',
        'UPGRADE_3',
        'UPGRADE_4',
        'UPGRADE_5',
        'UPGRADE_6',
        'LINE_AT',
        'PLANT_AT',
        'PROCESS_AT',
        'START_AT',
    ];

    protected $dateFormat = 'Y/m/d';

    public function setCreatedAtAttribute($date)
    {
        return Carbon::createFromFormat('Y-m-d H:i:s', $date)->format('Y/m/d');
    }

    public function setUpdatedAtAttribute($date)
    {
        return Carbon::createFromFormat('Y-m-d H:i:s', $date)->format('Y/m/d');
    }
}

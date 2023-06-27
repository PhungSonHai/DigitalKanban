<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class APHKaizenMonth extends Model
{
    use HasFactory;

    protected $table = 'aph_kaizen_month';
    protected $primaryKey = 'id';

    protected $fillable = [
        'kaizen_order',
        'kaizen_year',
        'kaizen_month',
        'path_avatar',
        'name',
        'msnv',
        'department',
        'plant',
        'after_image',
        'after_description',
        'current_image',
        'current_description',
        'benefit',
        'upgrade_0',
        'upgrade_1',
        'upgrade_2',
        'upgrade_3',
        'upgrade_4',
        'upgrade_5',
        'upgrade_6',
        'line_at',
        'plant_at',
        'process_at',
        'start_at'
    ];
}

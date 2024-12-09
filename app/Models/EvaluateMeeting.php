<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EvaluateMeeting extends Model
{
    use HasFactory;

    protected $table = 'aph_evaluate_meeting';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'line_code',
        'evaluate_date',
        'point_1',
        'point_2',
        'point_3',
        'point_4',
        'point_5',
        'point_6',
        'point_7',
        'point_8',
        'point_9',
        'point_10',
        'total_point'
    ];
}

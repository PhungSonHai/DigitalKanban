<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class APHLineOfAccount extends Model
{
    use HasFactory;

    protected $table = 'APH_LINE_OF_ACCOUNT';
    protected $primaryKey = 'ID';
    const CREATED_AT = 'CREATED_AT';
    const UPDATED_AT = 'UPDATED_AT';

    protected $fillable = [
        'USERNAME',
        'LINE_CODE'
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

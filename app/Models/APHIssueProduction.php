<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class APHIssueProduction extends Model
{
    use HasFactory;

    protected $table = 'aph_issue_production';
    protected $primaryKey = 'id';

    protected $fillable = [
        'line_code',
        'affect',
        'reason',
        'description_reason',
        'action_resolve',
        'responsible',
        'is_solved'
    ];
}

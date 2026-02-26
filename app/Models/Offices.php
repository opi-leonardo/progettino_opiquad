<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Offices extends Model
{
    protected $fillable = [
        'nome',
        'inizioOrarioIngresso',
        'fineOrarioIngresso',
        'inizioOrarioUscita',
        'fineOrarioUscita',

    ];

    public function office()
    {
        return $this->belongsTo(Offices::class, 'office_id');
    }
}

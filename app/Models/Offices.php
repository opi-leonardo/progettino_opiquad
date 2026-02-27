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
        'night_shift'

    ];

    public function users()
    {
        return $this->hasMany(Users::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Users extends Model
{
    protected $fillable = [
        'nome',
        'cognome',
        'email',
        'giornoCorto',
        'office_id'
    ];

    public function office()
    {
        return $this->belongsTo(Offices::class, 'office_id');
    }
}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    use HasFactory;

    protected $table = 'genres';
    protected $fillable = [
        'slug',
        'name',
        'description',
        'status',
        'meta_title',
        'meta_keyword',
        'meta_description',
    ];
}

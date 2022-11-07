<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Title extends Model
{
    use HasFactory;

    protected $table = 'title';
    protected $fillable = [
        'genre_id',
        'slug',
        'name',
        'author',
        'summary',
        'year',
        'price',
        'isbn',
        'cover',
        'pages',
        'favorites',
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;
    protected $table = 'blogs';
    protected $fillable = [
        'blog_category_id',
        'title',
        'description',
        'image',
        'meta_title',
        'meta_keywords',
        'meta_description',
        'status',
    ];

    protected $with = ['blogcategory'];
    public function blogcategory(){
        return $this->belongsTo(BlogCategory::class, 'blog_category_id', 'id');
    }
}


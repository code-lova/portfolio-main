<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Project extends Model
{
    use HasFactory;
    protected $table = 'projects';
    protected $fillable = [
        'category_id',
        'image',
        'description',
        'project_name',
        'hash_tag_tech',
        'status',
        'demo_link',
        'project_link',
        'code_base',
    ];
    protected $appends = ['image_url'];

    //Eloquent relationship to use with React Js App in the front end.
    protected $with = ['category'];
    public function category(){
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    public function getImageUrlAttribute(): ?string
    {
        if (!$this->image) {
            return null;
        }

        if (config('filesystems.uploads_disk') === 'cloudinary') {
            return Storage::disk('cloudinary')->url($this->image);
        }

        return rtrim(config('app.url'), '/').'/'.$this->image;
    }
}

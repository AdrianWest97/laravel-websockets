<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use ShiftOneLabs\LaravelCascadeDeletes\CascadesDeletes;


class Post extends Model
{
    use CascadesDeletes;

protected $cascadeDeletes = ['tags','image','comments'];

  protected $fillable = ["post","category_id","isDraft","image"];
   public function category(){
       return $this->belongsTo(Category::class,"category_id");
   }
   public function user(){
       return $this->belongsTo(User::class,"user_id");
   }
   public function tags(){
       return $this->hasMany(Tags::class,"post_id");
   }
     public function image(){
       return $this->hasOne(Image::class,"post_id");
   }

   public function comments(){
       return $this->hasMany(Comment::class,"post_id");
   }
}

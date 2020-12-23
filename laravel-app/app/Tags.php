<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tags extends Model
{
    protected $fillable = ["post_id","name"];
    public function post(){
        return $this->belongsTo(Post::class,"post_id");
    }
}
<?php

namespace App\Http\Controllers;

use App\Events\addComment;
use App\Post;
use Illuminate\Http\Request;


class CommentController extends Controller
{
    public function create(Request $request){
        $data = $this->validate($request,[
                "comment" => "required","string",
                "post_id" => "required"
        ]);
        //find post
        $post = Post::find($data['post_id']);
        $post->comments()->create([
            "comment" => $data['comment'],
            "user_id" => auth('api')->id()
        ]);

        broadcast(new addComment($post->comments()->latest('id')->first()->loadMissing('user')));

    }
}
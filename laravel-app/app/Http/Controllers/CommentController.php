<?php

namespace App\Http\Controllers;

use App\Events\addComment;
use App\Post;
use App\Comment;
use App\Events\RemoveComment;
use App\Notifications\CommentNotification;
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

        //broadcast to public
        broadcast(new addComment($post->comments()->latest('id')->first()->loadMissing('user')));
        //notify the user of the post
        $comment = Comment::orderBy('created_at','desc')->with('user')->first();
       if($comment->user->id != $post->user->id){
           var_dump("broadcasting...");
       $post->user->notify(new CommentNotification($comment));
       }

    }

    public function delete($id){
        Comment::find($id)->delete();
        broadcast(new RemoveComment($id));
    }
}
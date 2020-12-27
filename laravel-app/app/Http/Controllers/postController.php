<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;
use App\Events\DeletePost;
use App\Events\NewPost;
use App\Events\UpdatePost;
use App\Post;
use Image;
use Illuminate\Support\Facades\Storage;


class postController extends Controller
{
    public function store(Request $request, $mode = null, $id=null){
        $data = $this->validate($request,[
            "post"=>"required","string",
            "title"=>"required","string",
            "category"=>"required","string",
            "tags" => "required","string",
            "isDraft" => "required","boolean"
        ]);


        $post = $mode == 'add' ? new Post : Post::find($id);
        //find category
        $category = Category::where("name",$data['category'])->first();
        $draft = $data['isDraft'] == 'false' ? false : true;
       $post->post = $data['post'];
       $post->title = $data['title'];
       $post->isDraft = $draft;
       $post->category_id = $category->id;
       $post->user_id = auth('api')->id();
       $post->save();

       //add tags
       $post->tags()->updateOrCreate(
           ['post_id' => $post->id],
           [
               "name"=>$data['tags']
           ]
           );
    //add image
    if($request->hasFile('image')){
        $this->saveImage($post,$request->file('image'));
    }
      if(!$draft && $mode != "edit"){
          //publish instantly
       broadcast(new NewPost($post->loadMissing('user','category','image','tags')));
      }

      if($mode = 'edit' && !$draft){
      broadcast(new UpdatePost($post->loadMissing('user','category','image','tags')));
      }
    }

            public function saveImage($post, $file){
              $destination = "public/images/";
              $filenameWithExt = $file->getClientOriginalName();
                $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
                 $filename = preg_replace("/[^A-Za-z0-9 ]/", '', $filename);
                 $filename = preg_replace("/\s+/", '-', $filename);
                  $extension = $file->getClientOriginalExtension();
                  $fileNameToStore = $filename.'_'.time().'.'.$extension;
                        // Resize image
                        $resize = Image::make($file)->resize(600, null, function ($constraint) {
                            $constraint->aspectRatio();
                        })->encode('jpg');

                        $save = Storage::put("{$destination}{$fileNameToStore}", $resize->__toString());
                    if($save){

                        $post->image()->updateOrCreate(
                            ['post_id'=> $post->id],
                            [
                            'path' =>  "/images/".$fileNameToStore
                        ]);
                    }
             }

    //all post
    public function all(){
        return Post::where('isDraft',false)->with(['category','user','image','tags'])->orderBy('created_at','desc')->get();
    }

    public function delete($id){
        $delete = Post::find($id)->delete();
       if($delete){
            broadcast(new DeletePost($id));
       }
       return $delete;

    }

    //get post by id
    public function get($id){
        return Post::where('id',$id)->with(['category','user','image','tags','comments.user'])->first();
    }

    //get user post
    public function userPost(){
        return Post::where("user_id",auth('api')->id())->with(['category','image','tags'])->get();
    }
}
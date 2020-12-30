<?php

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Route;



Route::group(['middleware' => ['auth:api']], function () {

    Route::get('/user', function (Request $request) {
    return $request->user();
});

Route::get("/user/post","postController@userPost");
Route::get("/user/notifications",function(){
    $user = User::find(auth()->id());
   return $user->notifications;
});
Route::get("/user/notifications/last",function(){
    $user = User::find(auth('api')->id());
   return $user->notifications()->orderBy("created_at","asc")->first();
});

Route::prefix('post')->group(function(){
Route::post("/create/{mode?}/{id?}","postController@store");
Route::delete("/delete/{id}","postController@delete");
});

//comments
Route::post('/comment/create', "CommentController@create");
Route::delete('/comment/delete/{id}', "CommentController@delete");
});

Route::get('/categories','CategoryController@all');
Route::get('/post/all','postController@all');
Route::get('/post/get/{id}',"postController@get");



Route::post('/login', 'LoginController@login');
Route::post('/register', 'RegisterController@register');
Route::post('/logout', 'LoginController@logout')->middleware('auth:api');
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group(['middleware' => ['auth:api']], function () {
    Route::get('/user', function (Request $request) {
    return $request->user();
});


Route::prefix('post')->group(function(){
Route::post("/create/{mode?}/{id?}","postController@store");
Route::delete("/delete/{id}","postController@delete");
Route::get('/get/{id}',"postController@get");
Route::get("/all","postController@userPost");
});
});

Route::get('/categories','CategoryController@all');
Route::get('/post/all','postController@all');
Route::post('/login', 'LoginController@login');
Route::post('/register', 'RegisterController@register');
Route::post('/logout', 'LoginController@logout')->middleware('auth:api');
<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Category;

class CategoryController extends Controller
{
    //get all categories
    public function all(){
        return Category::withCount(['post'])->orderBy("name","asc")->get();
    }
}
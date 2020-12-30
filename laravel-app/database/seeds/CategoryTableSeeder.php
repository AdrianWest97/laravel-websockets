<?php

use Illuminate\Database\Seeder;
use App\Category;
class CategoryTableSeeder extends Seeder
{

    public function run()
    {
        Category::truncate();
        $categories = ["Technology","Development","Entertainment","Life Style","DIY"];
        foreach($categories as $category){
            Category::create([
                "name"=>$category
            ]);
        }
    }
}
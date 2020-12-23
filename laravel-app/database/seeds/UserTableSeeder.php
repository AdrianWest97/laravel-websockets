<?php

use Illuminate\Database\Seeder;
use App\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;


class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    User::truncate();

        //admin user
        User::create([
            'name'=>"admin",
            'email'=>"admin@test.com",
            'is_admin'=>true,
            'password'=>Hash::make("password"),
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ]);
             User::create([
            'name'=>"Adrian West",
            'email'=>"west@test.com",
            'password'=>Hash::make("password"),
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ]);
           User::create([
            'name'=>"Shanay Walker",
            'email'=>"shanay@test.com",
            'password'=>Hash::make("password"),
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ]);
    }
}
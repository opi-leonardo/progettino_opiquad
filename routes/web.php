<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\UserController;
use App\Http\Controllers\OfficeController;

Route::get('/', function () {
    return Inertia::render('Layout');
})->name('home');

Route::resource('users', UserController::class);
Route::resource('offices', OfficeController::class);
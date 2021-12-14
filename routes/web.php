<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/Task-Group', [App\Http\Controllers\TaskGroupController::class, 'index'])->name('task.group.list');
    Route::get('/Task-Group-List', [App\Http\Controllers\TaskGroupController::class, 'taskGroupList']);
    Route::get('/Task-Group-Add', [App\Http\Controllers\TaskGroupController::class, 'create'])->name('task.group.add');
    Route::post('/Task-Group-Add', [App\Http\Controllers\TaskGroupController::class, 'store'])->name('task.group.store');

});

require __DIR__.'/auth.php';

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

    Route::get('/Task/{id}', [App\Http\Controllers\TaskController::class, 'index'])->name('task.list');
    Route::get('/Task-List/{id}', [App\Http\Controllers\TaskController::class, 'taskList']);
    Route::post('/Task-Add', [App\Http\Controllers\TaskController::class, 'store'])->name('task.store');
    Route::delete('/Task-Delete/{id}', [App\Http\Controllers\TaskController::class, 'destroy'])->name('task.delete');
    Route::get('/Task-Edit/{id}', [App\Http\Controllers\TaskController::class, 'edit'])->name('task.edit');
    Route::post('/Task-Edit/{id}', [App\Http\Controllers\TaskController::class, 'update'])->name('task.update');


});

require __DIR__.'/auth.php';

<?php

use Inertia\Inertia;
use App\Models\Classroom;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\ClassroomController;

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


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Classroom 
Route::resource('classrooms', ClassroomController::class)->middleware(['auth']);
Route::middleware('auth')->group(function () {
    Route::get('/classrooms/create', [ClassroomController::class, 'create'])->name('classrooms.create');
    Route::post('/classrooms', [ClassroomController::class, 'store'])->name('classrooms.store');
    Route::get('/classrooms/join', [StudentController::class, 'showJoinForm'])->name('classrooms.join.form');
    Route::post('/classrooms/join', [StudentController::class, 'joinClassroom'])->name('classrooms.join');
});
Route::middleware('auth:api')->get('/classrooms/teacher', [ClassroomController::class, 'getTeacherClassrooms']);

Route::middleware(['auth'])->group(function () {
    Route::get('/classrooms/join', [StudentController::class, 'showJoinForm'])->name('classrooms.join.form');
    Route::post('/classrooms/join', [StudentController::class, 'joinClassroom'])->name('classrooms.join');
});

require __DIR__ . '/auth.php';

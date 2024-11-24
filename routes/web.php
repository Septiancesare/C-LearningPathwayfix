<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\{
    ChatController,
    ProfileController,
    StudentController,
    MaterialController,
    ClassroomController,
    EnrollmentController,
    TaskController,
    SubmissionController
};

// Halaman Welcome
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Halaman Dashboard (hanya untuk user yang telah terverifikasi)
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Profile Routes (Autentikasi diperlukan)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Routes untuk siswa (Join Classroom)
Route::middleware('auth')->group(function () {
    Route::get('/classrooms/join', [StudentController::class, 'showJoinForm'])->name('classrooms.join.form');
    Route::post('/classrooms/join', [StudentController::class, 'joinClassroom'])->name('classrooms.join');
});

// Detail Halaman Classroom
Route::middleware('auth')->group(function () {
    Route::get('/classrooms/page/{classroom}', [ClassroomController::class, 'showPage'])->name('classrooms.show.page');
});


Route::middleware('auth')->group(function () {
    Route::get('/classrooms/{classId}/chats/data', [ChatController::class, 'index'])->name('chats.index'); // Untuk data API

    Route::post('/classrooms/{classId}/chats', [ChatController::class, 'store'])->name('chats.store'); // Untuk mengirim pesan

    Route::get('/classrooms/{classId}/chats', [ChatController::class, 'showChat'])->name('chats.show'); // Untuk halaman chat
});

Route::middleware('auth')->get('/api/user', function () {
    return response()->json(Auth::user());
});


// Enrollment Routes
Route::middleware('auth')->group(function () {
    Route::get('/enrollments', [EnrollmentController::class, 'index']);
});

// Routes untuk Guru: Mendapatkan Classroom berdasarkan Teacher ID
Route::middleware('auth')->group(function () {
    Route::get('/classrooms/teacher/{teacherId}', [ClassroomController::class, 'getClassroomsByTeacher']);
});

// Routes untuk Material (Autentikasi diperlukan)
Route::middleware('auth')->group(function () {
    Route::get('/classrooms/{classId}/materials/create', [MaterialController::class, 'create'])->name('materials.create');
    Route::post('/classrooms/{classId}/materials/store', [MaterialController::class, 'store'])->name('materials.store');

    Route::get('/classrooms/{classId}/materials', [MaterialController::class, 'index'])->name('materials.index');
    Route::get('/materials/{id}', [MaterialController::class, 'show'])->name('materials.show');
    Route::put('/materials/{id}', [MaterialController::class, 'update'])->name('materials.update');
    Route::delete('/materials/{id}', [MaterialController::class, 'destroy'])->name('materials.destroy');
});

//task
Route::middleware(['auth'])->group(function () {
    Route::get('/classrooms/{classroom}/tasks/create', [TaskController::class, 'create']);
    Route::post('/classrooms/{classroom}/tasks', [TaskController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::get('/tasks', [TaskController::class, 'index']);
    Route::post('/tasks', [TaskController::class, 'store']);
    Route::post('/tasks/{task}/submit', [SubmissionController::class, 'store']);
});

// Route untuk Upload Gambar
Route::post('/upload-image', function (Request $request) {
    // Validasi file yang diupload
    $request->validate([
        'image' => 'required|image|mimes:jpg,jpeg,png,gif|max:2048',
    ]);

    // Simpan gambar dan dapatkan URL
    $path = $request->file('image')->store('images', 'public');

    // Kembalikan URL gambar
    return response()->json([
        'url' => Storage::url($path),
    ]);
})->middleware('auth');

// Resource Routes untuk Classroom (Autentikasi diperlukan)
Route::middleware('auth')->resource('classrooms', ClassroomController::class);

// Routes tambahan untuk Guru (Membuat Classroom)
Route::middleware('auth')->group(function () {
    Route::get('/classrooms/create', [ClassroomController::class, 'create'])->name('classrooms.create');
    Route::post('/classrooms', [ClassroomController::class, 'store'])->name('classrooms.store');
    Route::delete('/classrooms/{id}', [ClassroomController::class, 'destroy'])->middleware('auth');
    Route::get('/classrooms/{id}', [ClassroomController::class, 'show'])->name('classrooms.show');
    Route::get('/classrooms/{id}/students', [ClassroomController::class, 'showStudents'])->name('classrooms.showStudents');
    Route::delete('/classrooms/{classroom}/students/{student}', [ClassroomController::class, 'removeStudent'])->name('classrooms.students.destroy');
});

// API: Mendapatkan Classrooms oleh Guru yang telah terautentikasi (untuk API)
Route::middleware('auth:api')->get('/classrooms/teacher', [ClassroomController::class, 'getTeacherClassrooms']);

// Include file auth routes bawaan Laravel
require __DIR__ . '/auth.php';

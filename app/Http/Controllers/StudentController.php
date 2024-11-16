<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User; // Model untuk User
use App\Models\Classroom; // Model untuk Classroom

class StudentController extends Controller
{
    /**
     * Show the form to join a classroom.
     */
   public function showJoinForm()
{
    dd('Show Join Form');
    return Inertia::render('JoinClassroom');
}

    /**
     * Handle joining a classroom.
     */
    public function joinClassroom(Request $request)
    {
        $request->validate([
            'enroll_code' => 'required|string|max:255', // Validasi input kode enroll
        ]);

        $classroom = Classroom::where('enroll_code', $request->enroll_code)->first();
        $auth = Auth::user()->id;

        if (!$classroom) {
            return back()->withErrors(['enroll_code' => 'Invalid enroll code.']);
        }

        // Pastikan user belum terdaftar dalam classroom
        if ($classroom->students()->where('user_id', $auth)->exists()) {
            return back()->withErrors(['enroll_code' => 'You are already a member of this classroom.']);
        }

        // Menambahkan user ke classroom
        $classroom->students()->attach($auth);

        return redirect()->route('dashboard')->with('success', 'You have successfully joined the classroom!');
    }
}

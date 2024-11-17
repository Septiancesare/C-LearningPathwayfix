<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
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
        return Inertia::render('Classrooms/JoinClassroom');
    }

    /**
     * Handle joining a classroom.
     */
    public function joinClassroom(Request $request)
    {
        
        $request->validate([
            'enroll_code' => 'required|string',
        ]);

        $classroom = Classroom::where('enrollkeyment', $request->enroll_code)->first();
        $auth = Auth::id();

        
        if (!$classroom) {
            return back()->withErrors(['enroll_code' => 'Invalid enroll code.']);
        }

        if ($classroom->students()->where('student_id', $auth)->exists()) {
            return back()->withErrors(['enrollkeyment' => 'You are already a member of this classroom.']);
        }

        $classroom->students()->attach($auth);


        return redirect()->route('dashboard')->with('success', 'You have successfully joined the classroom!');
    }
}

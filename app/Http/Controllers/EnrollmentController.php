<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use App\Models\Enrollment;
use Illuminate\Http\Request;

class EnrollmentController extends Controller
{
    //
    public function index(Request $request)
    {
        $user = $request->user(); 

        
        $enrollments = Enrollment::where('student_id', $user->id)
            ->with('classroom.teacher') 
            ->get();

        return response()->json($enrollments);
    }
}

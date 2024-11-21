<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Classroom;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ClassroomController extends Controller
{

    public function index()
    {
        $auth = Auth::user();
        $classrooms = $auth->classrooms;

        return inertia('Dashboard', [
            'classrooms' => $classrooms,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required|string|max:255']);
        $auth = Auth::user();

        Classroom::create([
            'name' => $request->name,
            'teacher_id' => $auth->id,
            'description' => $request->description,
        ]);

        return redirect()->route('dashboard');
    }

    public function show(Classroom $classroom)
    {
        $classroom->load('students');
        return inertia('Classrooms/Classroom', ['classroom' => $classroom]);
    }



    public function create()
    {
        return inertia('Classrooms/CreateClassroom');
    }

    public function destroy($id)
    {
        $classroom = Classroom::find($id);

        if (!$classroom) {
            return response()->json(['message' => 'Classroom not found'], 404);
        }

        // Optional: Add authorization check here
        if (Auth::user()->role !== 'teacher') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $classroom->delete();

        return response()->json(['message' => 'Classroom deleted successfully'], 200);
    }

    public function getTeacherClassrooms()
    {
        $auth = Auth::user()->id;
        $classrooms = Classroom::where('teacher_id', $auth)->get();
        return response()->json($classrooms);
    }

    public function getClassroomsByTeacher($teacherId)
    {
        $classrooms = Classroom::where('teacher_id', $teacherId)->get();

        if ($classrooms->isEmpty()) {
            return response()->json(['message' => 'No classrooms found'], 404);
        }

        return response()->json($classrooms, 200);
    }

    public function showPage($id)
    {
        $classroom = Classroom::with(['teacher', 'students'])->findOrFail($id);

        $user = Auth::user();
        $studentClassrooms = $user->classrooms;

        if ($user->role === 'student') {
            $classrooms = $user->enrolledClassrooms;
        } elseif ($user->role === 'teacher') {
            $classrooms = $user->createdClassrooms;
        }


        return Inertia::render('Classrooms/ClassroomPage', [
            'classroom' => $classroom,
            'studentClassrooms' => $studentClassrooms
        ]);
    }
}

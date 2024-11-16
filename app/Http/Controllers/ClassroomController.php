<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ClassroomController extends Controller
{

    public function index()
    {
        $auth = Auth::user(); 
        $classrooms = $auth->classrooms;  // Relasi kelas dengan teacher_id
    
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
            'teacher_id' => $auth ->id,
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
        return inertia('Classrooms/CreateClassroom'); // Ganti sesuai dengan nama file komponen Anda
    }

    public function getTeacherClassrooms()
{
    $auth = Auth::user()->id;
    $classrooms = Classroom::where('teacher_id', $auth)->get();
    return response()->json($classrooms);
}

}

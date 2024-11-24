<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Inertia\Inertia;
use App\Models\Material;
use App\Models\Classroom;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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

    public function show($id)
    {

        $classroom = Classroom::with(['materials', 'tasks', 'teachers'])->findOrFail($id);
        $materials = Material::where('class_id', $classroom)->get();
        $tasks = Task::where('classroom_id', $classroom)->get();


        return response()->json($classroom, $tasks, $materials);
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

    public function showStudents($id)
    {
        // Ambil classroom berdasarkan ID
        $classroom = Classroom::with('students')->findOrFail($id);

        // Return view dan kirimkan data classroom beserta siswa yang terdaftar
        return inertia('Classrooms/ShowStudent', ['classroom' => $classroom]);
    }

    public function removeStudent($classroomId, $studentId)
    {
        // Hapus relasi user dari kelas (misalnya tabel 'classroom_students')
        DB::table('enroll')
            ->where('classroom_id', $classroomId)
            ->where('student_id', $studentId)
            ->delete();

        return redirect()->back()->with('success', 'Student removed from the classroom.');
    }
}

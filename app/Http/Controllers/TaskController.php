<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Inertia\Inertia;
use App\Models\Classroom;
use App\Models\Submission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::all();
        return response()->json(['tasks' => $tasks]);
    }

    public function create(Classroom $classroom)
    {
        return inertia('Task/CreateTask', ['classroom' => $classroom]);
    }

    public function store(Request $request, Classroom $classroom)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'due_date' => 'required|date',
        ]);

        $classroom->tasks()->create($validated);

        return redirect()->route('classrooms.show.page', $classroom->id)
            ->with('success', 'Task created successfully!');
    }

    public function edit(Classroom $classroom, Task $task)
    {
        return inertia('Task/TaskEdit', [
            'classroom' => $classroom,
            'task' => $task,
        ]);
    }
    public function update(Request $request, Classroom $classroom, Task $task)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'due_date' => 'required|date',
        ]);

        $task->update($validated);

        return redirect()->route('classrooms.show.page', $classroom->id)
            ->with('success', 'Task updated successfully!');
    }

    public function show($id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json(['error' => 'Task not found'], 404);
        }

        return response()->json($task);
    }

    public function showPage($id)
    {
        $task = Task::find($id);

        if (!$task) {
            return inertia('Task/TaskPage', ['error' => 'Task not found']);
        }

        return inertia('Task/TaskPage', [
            'task' => $task,
            'classroom' => $task->classroom, // Asumsikan task memiliki relasi dengan classroom
        ]);
    }
    public function destroy(Classroom $classroom, Task $task)
    {
        $task->delete();

        return redirect()->route('classrooms.show.page', $classroom->id)
            ->with('success', 'Task deleted successfully!');
    }

    public function viewSubmissions(Classroom $classroom, Task $task)
    {
        // Fetch all submissions for this task with user information
        $submissions = Submission::where('task_id', $task->id)
            ->with('user')
            ->get();

        return Inertia::render('Task/TaskSubmission', [
            'task' => $task,
            'classroom' => $classroom,
            'submissions' => $submissions,
        ]);
    }
    
    public function submitTaskPage(Classroom $classroom, Task $task)
    {
        // Cari submission yang sudah ada untuk user saat ini dan task tertentu
        $existingSubmission = Submission::where('task_id', $task->id)
            ->where('user_id', Auth::id())
            ->first();

        return Inertia::render('Task/SubmitTask', [
            'task' => $task,
            'classroom' => $classroom,
            'existingSubmission' => $existingSubmission ? [
                'notes' => $existingSubmission->notes,
                'grade' => $existingSubmission->grade,
                'feedback' => $existingSubmission->feedback,
                'file_path' => $existingSubmission->file_path
            ] : null,
        ]);
    }
}

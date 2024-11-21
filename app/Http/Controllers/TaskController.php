<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Classroom;
use Illuminate\Http\Request;

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
}

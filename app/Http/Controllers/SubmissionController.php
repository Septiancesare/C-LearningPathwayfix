<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Inertia\Inertia;
use App\Models\Classroom;
use App\Models\Submission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class SubmissionController extends Controller
{
    public function create(Classroom $classroom, Task $task)
    {
        return Inertia::render('Task/SubmitTask', [
            'task' => $task,
            'classroom' => $classroom,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'task_id' => 'required|exists:tasks,id',
            'content' => 'nullable|string',
            'file' => 'nullable|file|mimes:pdf,doc,docx,zip|max:2048',
        ]);

        $filePath = null;
        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('submissions', 'public');
        }

        $submission = Submission::create([
            'task_id' => $validated['task_id'],
            'user_id' => Auth::user()->id,
            'content' => $validated['content'],
            'file_path' => $filePath,
        ]);

        return response()->json(['message' => 'Submission uploaded successfully!', 'submission' => $submission]);
    }

    public function submit(Request $request, Classroom $classroom, Task $task)
    {
        // Check if user has already submitted
        $existingSubmission = Submission::where('task_id', $task->id)
            ->where('user_id', Auth::id())
            ->first();

        if ($existingSubmission) {
            return back()->with('error', 'You have already submitted this task.');
        }

        $validated = $request->validate([
            'file' => 'required|file|max:10240', // 10MB max
            'notes' => 'nullable|string|max:500',
        ]);

        // Store file
        $filePath = $request->file('file')->store('submissions/' . $classroom->id . '/' . $task->id);

        // Create submission
        $submission = Submission::create([
            'task_id' => $task->id,
            'user_id' => Auth::id(),
            'file_path' => $filePath,
            'notes' => $validated['notes'] ?? null,
        ]);

        return redirect()
            ->route('tasks.submit.page', ['classroom' => $classroom->id, 'task' => $task->id])
            ->with('success', 'Task submitted successfully!');
    }

    public function view(Classroom $classroom, Task $task, Submission $submission)
    {
        // Ensure the submission belongs to the task and classroom
        if ($submission->task_id !== $task->id) {
            abort(403, 'Unauthorized');
        }

        return Inertia::render('Task/TaskReview', [
            'submission' => $submission->load('user'),
            'task' => $task,
            'classroom' => $classroom,
        ]);
    }

    public function grade(Request $request, Classroom $classroom, Task $task, Submission $submission)
    {
        $validated = $request->validate([
            'grade' => 'required|numeric|min:0|max:100',
            'feedback' => 'nullable|string|max:1000',
        ]);

        $submission->update([
            'grade' => $validated['grade'],
            'feedback' => $validated['feedback'] ?? null,
        ]);

        return redirect()
            ->route('tasks.show.page', $task->id)
            ->with('success', 'Submission graded successfully!');
    }

    public function download(Classroom $classroom, Task $task, Submission $submission)
    {
        // Add authorization check
        // Ensure the submission belongs to the task and classroom
        if ($submission->task_id !== $task->id) {
            abort(403, 'Unauthorized');
        }

        // Check if file exists
        if (!Storage::exists($submission->file_path)) {
            abort(404, 'File not found');
        }

        return Storage::download($submission->file_path);
    }
}

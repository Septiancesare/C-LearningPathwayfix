<?php

namespace App\Http\Controllers;

use App\Models\Submission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SubmissionController extends Controller
{
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
}

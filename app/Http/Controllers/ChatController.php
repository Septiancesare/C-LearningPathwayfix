<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use Inertia\Inertia;
use App\Models\Classroom;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    // Fetch all chats for a specific classroom
    public function index($classId)
    {
        $chats = Chat::with('user')->where('class_id', $classId)->get();

        return response()->json($chats);
    }

    public function showChat($classId)
    {
        // Fetch the classroom data if needed
        $classroom = Classroom::findOrFail($classId);

        // Pass data to the Inertia React component
        return Inertia::render('Classrooms/ChatPage', [
            'classId' => $classroom->id,
        ]);
    }

    // Store a new message
    public function store(Request $request, $classId)
    {
        // Store the new message in the database
        $chat = new Chat();
        $chat->message = $request->message;
        $chat->user_id = Auth::user()->id;
        $chat->classroom_id = $classId;
        $chat->save();

        // Return the saved chat message as JSON response
        return response()->json($chat, 201);
    }
}

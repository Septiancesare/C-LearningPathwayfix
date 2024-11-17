<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Request;

class Classroom extends Model
{
    //
    protected $fillable = ['name', 'teacher_id', 'enrollkeyment', 'description'];

    /**
     * Relationship to the teacher (user with role "teacher").
     */
    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }

    /**
     * Relationship to students (users with role "student").
     */
    public function students()
    {
        return $this->belongsToMany(User::class, 'enroll', 'classroom_id', 'student_id');
    }

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }

    public function materials()
    {
        return $this->hasMany(Material::class); 
    }

    // Relasi dengan tugas
    public function tasks()
    {
        return $this->hasMany(Task::class); 
    }

    public function indexForTeacher(Request $request)
    {
        $user = $request->user();

        if ($user->role !== 'teacher') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $classrooms = Classroom::where('teacher_id', $user->id)->get();

        return response()->json($classrooms);
    }




    protected static function booted()
    {
        static::creating(function ($classroom) {
            $classroom->enrollkeyment = strtoupper(bin2hex(random_bytes(3))); // 6 karakter acak
        });
    }
}

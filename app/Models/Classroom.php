<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
        return $this->belongsToMany(User::class, 'classroom_user', 'classroom_id', 'user_id');
    }

    protected static function booted()
{
    static::creating(function ($classroom) {
        $classroom->enrollkeyment = strtoupper(bin2hex(random_bytes(3))); // 6 karakter acak
    });
}
}

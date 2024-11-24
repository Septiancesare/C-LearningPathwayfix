<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    protected $table = 'users';
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scopeTeachers($query)
    {
        return $query->where('role', 'teacher');
    }
    public function classrooms()
    {
        return $this->hasMany(Classroom::class, 'teacher_id');
    }
}

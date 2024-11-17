<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $table = 'users';
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scopeStudents($query)
    {
        return $query->where('role', 'student');
    }
}

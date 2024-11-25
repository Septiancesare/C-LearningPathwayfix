<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Material extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'class_id',
        'material_title',
        'materials_data',
    ];

    public function classroom()
{
    return $this->belongsTo(Classroom::class, 'class_id');
}


    public function user()
    {
        return $this->belongsTo(User::class, 'user_id'); // Jika materi memiliki penulis
    }
}

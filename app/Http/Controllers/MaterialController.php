<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Material;
use App\Models\Classroom;
use Illuminate\Http\Request;

class MaterialController extends Controller
{

    // Menampilkan daftar materi dalam kelas
    // public function index($classId)
    // {
    //     $classroom = Classroom::with('materials')->findOrFail($classId);


    //     return Inertia::render('Materials/CreateMaterial', [
    //         'classroomId' => $classId,
    //         'classrooms' => $classroom,
    //     ]);
    // }

    // Menampilkan halaman untuk membuat materi baru
    public function create($classId)
    {
        $classroom = Classroom::findOrFail($classId);

        return Inertia::render('Materials/CreateMaterial', [
            'classroomId' => $classId, // Pastikan ini dikirim
            'classroom' => $classroom
        ]);
    }

    // Menyimpan materi baru ke database
    public function store(Request $request, $classId)
    {
        // Validasi classroom ID
        $classroom = Classroom::findOrFail($classId);

        $request->validate([
            'material_title' => 'required|string|max:255',
            'materials_data' => 'required|string',
        ]);

        try {
            $material = Material::create([
                'class_id' => $classId,
                'material_title' => $request->material_title,
                'materials_data' => $request->materials_data,
                'image_url' => $request->image_url ?? null,
            ]);

            return response()->json([
                'message' => 'Material berhasil dibuat',
                'material' => $material,
                'redirect' => route('materials.index', $classId)
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal membuat material: ' . $e->getMessage()
            ], 500);
        }
    }

    // Tambahkan method untuk mengambil materi berdasarkan classroom
    public function index($classId)
    {
        $materials = Material::where('classroom_id', $classId)->get();

        return response()->json($materials);
    }


    // Menampilkan materi tertentu
    public function show($id)
    {
        $material = Material::findOrFail($id);

        return Inertia::render('Materials/MaterialPage', [
            'material' => $material,
        ]);
    }

    // Mengupdate materi
    public function update(Request $request, $id)
    {
        $material = Material::findOrFail($id);

        $request->validate([
            'material_title' => 'required|string|max:255',
            'materials_data' => 'required|string',
            'image_url' => 'nullable|url'
        ]);

        $material->update([
            'material_title' => $request->material_title,
            'materials_data' => $request->materials_data,
            'image_url' => $request->image_url
        ]);

        return redirect()->route('materials.index', $material->class_id)
            ->with('success', 'Material updated successfully');
    }

    // Menghapus materi
    public function destroy($id)
    {
        $material = Material::findOrFail($id);
        $material->delete();

        return redirect()->back()->with('success', 'Material deleted successfully.');
    }


    public function showPage($id)
    {
        $material = Material::findOrFail($id);
        return Inertia::render('Materials/MaterialsPage', [
            'material' => $material,
        ]);
    }
    public function edit($id)
    {
        $material = Material::findOrFail($id);

        return Inertia::render('Materials/MaterialUpdate', [
            'material' => $material,
        ]);
    }
}

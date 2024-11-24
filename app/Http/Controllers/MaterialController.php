<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Material;
use App\Models\Classroom;
use Illuminate\Http\Request;

class MaterialController extends Controller
{

    // Menampilkan daftar materi dalam kelas
    public function index($classId)
    {
        $classroom = Classroom::with('materials')->findOrFail($classId);

        return Inertia::render('MaterialsPage', [
            'classId' => $classId,
            'materials' => $classroom->materials,
        ]);
    }

    // Menampilkan halaman untuk membuat materi baru
    public function create($classId)
    {
        $classroom = Classroom::findOrFail($classId);

        return Inertia::render('Materials/CreateMaterial', [
            'classroom' => $classroom,
        ]);
    }

    // Menyimpan materi baru ke database
    public function store(Request $request, $classId)
    {
        $classroom = Classroom::findOrFail($classId); // Pastikan kelas valid

        $request->validate([
            'material_title' => 'required|string|max:255',
            'materials_data' => 'required|string',
        ]);

        Material::create([
            'classroom_id' => $classId,
            'material_title' => $request->material_title,
            'materials_data' => $request->materials_data,
        ]);

        return redirect()->route('materials.index', ['classId' => $classId])
            ->with('success', 'Material created successfully.');
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
        $request->validate([
            'material_title' => 'required|string|max:255',
            'materials_data' => 'required|string',
        ]);

        $material = Material::findOrFail($id);
        $material->update($request->only(['material_title', 'materials_data']));

        return redirect()->route('materials.show', $id)->with('success', 'Material updated successfully.');
    }

    // Menghapus materi
    public function destroy($id)
    {
        $material = Material::findOrFail($id);
        $material->delete();

        return redirect()->back()->with('success', 'Material deleted successfully.');
    }
}

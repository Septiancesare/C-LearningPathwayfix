import React, { useState } from "react";
import { useForm, Link } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";

export default function MaterialUpdate({ material, classId }) {
    const { data, setData, put, processing, errors } = useForm({
        material_title: material.material_title || "",
        materials_data: material.materials_data || "",
        image_url: material.image_url || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/materials/${material.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                alert("Material updated successfully");
            },
        });
    };

    return (
        <Authenticated>
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6">Update Material</h1>

                <form onSubmit={handleSubmit} className="">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Material Title
                        </label>
                        <input
                            type="text"
                            value={data.material_title}
                            onChange={(e) =>
                                setData("material_title", e.target.value)
                            }
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                            required
                        />
                        {errors.material_title && (
                            <p className="text-red-500 text-xs italic">
                                {errors.material_title}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Material Content
                        </label>
                        <textarea
                            value={data.materials_data}
                            onChange={(e) =>
                                setData("materials_data", e.target.value)
                            }
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                            rows="5"
                            required
                        ></textarea>
                        {errors.materials_data && (
                            <p className="text-red-500 text-xs italic">
                                {errors.materials_data}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Image URL (Optional)
                        </label>
                        <input
                            type="text"
                            value={data.image_url}
                            onChange={(e) =>
                                setData("image_url", e.target.value)
                            }
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Update Material
                        </button>
                        <Link
                            href={`/classrooms/${classId}/materials`}
                            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </Authenticated>
    );
}

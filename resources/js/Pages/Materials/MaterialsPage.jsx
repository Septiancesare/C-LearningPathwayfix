import React from "react";
import { Link, usePage } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";

export default function MaterialPage({ material }) {
    const { user } = usePage().props.auth;

    return (
        <Authenticated>
            <div className="container mx-auto p-6">
                <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
                    <div className="flex justify-end items-center mb-6">
                        {user.role === "teacher" && (
                            <Link
                                href={`/materials/${material.id}/edit`}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Edit Material
                            </Link>
                        )}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-center">
                            {material.material_title}
                        </h1>
                    </div>

                    {material.image_url && (
                        <div className="mb-6">
                            <img
                                src={material.image_url}
                                alt={material.material_title}
                                className="w-full h-auto rounded-lg"
                            />
                        </div>
                    )}

                    <div className="prose max-w-none">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: material.materials_data,
                            }}
                        />
                    </div>

                    <div className="mt-6 text-gray-500 text-sm">
                        <p>
                            Created at:{" "}
                            {new Date(material.created_at).toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}

import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Description } from "@headlessui/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";

export default function CreateClassroom() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post("/classrooms", { name, description });
    };

    return (
        <Authenticated>
            <>
                <div className="container">
                    <h2 className="flex justify-center text-2xl font-bold m-4">
                        Create New Classroom
                    </h2>
                    <form onSubmit={handleSubmit} className="m-10 space-y-4">
                        <div>
                            <label className="block text-lg">
                                Classroom Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-lg">Description</label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div className="button flex justify-between">
                            <Link href={route("dashboard")}>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-blue-700"
                                >
                                    Back
                                </button>
                            </Link>
                            
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                            >
                                Create Classroom
                            </button>
                        </div>
                    </form>
                </div>
            </>
        </Authenticated>
    );
}

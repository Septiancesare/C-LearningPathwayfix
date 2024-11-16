import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";

export default function JoinClassroom() {
    const [enrollCode, setEnrollCode] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post("/classrooms/join", { enroll_code: enrollCode });
    };

    return (
        <Authenticated>
            <>
                <div className="container">
                    <h2 className="flex justify-center text-2xl font-bold m-4">
                        Join Classroom
                    </h2>
                    <form onSubmit={handleSubmit} className="m-10 space-y-4">
                        <div>
                            <label className="block text-lg">Enroll Code</label>
                            <input
                                type="text"
                                value={enrollCode}
                                onChange={(e) => setEnrollCode(e.target.value)}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div className="button flex justify-between">
                            <Link href={route("dashboard")}>
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                    Back
                                </button>
                            </Link>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                            >
                                Join Classroom
                            </button>
                        </div>
                    </form>
                </div>
            </>
        </Authenticated>
    );
}

import React from "react";
import { useForm, Head } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";

const TaskEdit = ({ task, classroom }) => {
    const { data, setData, put, processing, errors } = useForm({
        title: task.title,
        description: task.description,
        due_date: task.due_date,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(
            route("tasks.update", {
                classroom: classroom.id,
                task: task.id,
            })
        );
    };

    

    return (
        <Authenticated>
            <Head title={`Edit Task: ${task.title}`} />
            <div className="container mx-auto mt-10 p-6 bg-white shadow-md">
                <h1 className="text-2xl font-bold mb-4 text-center">
                    Edit Task
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        />
                        {errors.title && (
                            <p className="text-red-500 text-xs italic">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Description
                        </label>
                        <textarea
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                            rows="4"
                        />
                        {errors.description && (
                            <p className="text-red-500 text-xs italic">
                                {errors.description}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Due Date
                        </label>
                        <input
                            type="date"
                            value={data.due_date}
                            onChange={(e) =>
                                setData("due_date", e.target.value)
                            }
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        />
                        {errors.due_date && (
                            <p className="text-red-500 text-xs italic">
                                {errors.due_date}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            {processing ? "Updating..." : "Update Task"}
                        </button>
                    </div>
                </form>
            </div>
        </Authenticated>
    );
};

export default TaskEdit;

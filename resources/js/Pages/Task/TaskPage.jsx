import React from "react";
import { Head, Link, useForm, router } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";

const TaskPage = ({ task, classroom, error }) => {
    const { delete: destroy } = useForm();

    const handleDelete = (taskId) => {
        if (confirm("Are you sure you want to delete this task?")) {
            // Use router.delete from Inertia instead of axios
            router.delete(
                route("tasks.destroy", {
                    classroom: classroom.id,
                    task: taskId,
                }),
                {
                    onSuccess: () => {
                        alert("Task deleted successfully.");
                        router.visit(`/classrooms/${classroom.id}`);
                    },
                    onError: () => {
                        alert("Failed to delete task.");
                    },
                }
            );
        }
    };

    if (error) {
        return <p>{error}</p>;
    }

    if (!task) {
        return <p>Task not found.</p>;
    }

    return (
        <Authenticated>
            <Head title={task.title} />
            <div className="container mx-auto mt-10 p-6 bg-white shadow-md">
                <h1 className="text-2xl font-bold mb-4 text-center">
                    {task.title}
                </h1>
                {classroom && (
                    <div className="mt-4">
                        <p>
                            <strong>Classroom:</strong> {classroom.name}
                        </p>
                    </div>
                )}
                <div className="mb-4">
                    <p>
                        <strong>Due Date:</strong> {task.due_date}
                    </p>
                </div>
                <div className="mb-4">
                    <p>
                        <strong>Description:</strong> {task.description}
                    </p>
                </div>
            </div>
            <div className="button flex justify-evenly mt-4">
                <Link
                    href={route("classrooms.show.page", { id: classroom.id })}
                    className="bg-gray-500 px-4 py-2 rounded-lg text-white"
                >
                    Back to Class
                </Link>

                <Link
                    href={route("tasks.edit", {
                        classroom: classroom.id,
                        task: task.id,
                    })}
                    className="bg-blue-500 px-4 py-2 rounded-lg text-white"
                >
                    Edit
                </Link>

                <Link
                    href={route("tasks.submissions", {
                        classroom: classroom.id,
                        task: task.id,
                    })}
                    className="bg-blue-500 px-4 py-2 rounded-lg text-white"
                >
                    View Submission
                </Link>

                <button
                    onClick={() => handleDelete(task.id)}
                    className="bg-red-600 px-4 py-2 rounded-lg text-white"
                >
                    Delete Task
                </button>
            </div>
        </Authenticated>
    );
};

export default TaskPage;

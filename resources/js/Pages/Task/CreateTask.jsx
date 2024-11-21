import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";

export default function CreateTask({ classroom }) {
    const { data, setData, post, errors } = useForm({
        title: "",
        description: "",
        due_date: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/classrooms/${classroom.id}/tasks`, {
            onSuccess: () => {
                alert("Task created successfully!");
            },
        });
    };

    return (
        <Authenticated>
            <div className="container mx-auto mt-10 p-6 bg-white shadow-md">
                <h1 className="text-2xl font-bold mb-6">Create Task</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Title</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                        />
                        {errors.title && <p className="text-red-600">{errors.title}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Description</label>
                        <textarea
                            className="w-full p-2 border rounded"
                            value={data.description}
                            onChange={(e) => setData("description", e.target.value)}
                        />
                        {errors.description && <p className="text-red-600">{errors.description}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Due Date</label>
                        <input
                            type="date"
                            className="w-full p-2 border rounded"
                            value={data.due_date}
                            onChange={(e) => setData("due_date", e.target.value)}
                        />
                        {errors.due_date && <p className="text-red-600">{errors.due_date}</p>}
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Create Task
                    </button>
                </form>
            </div>
        </Authenticated>
    );
}

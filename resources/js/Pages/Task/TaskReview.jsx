import React, { useState } from "react";
import { useForm, Link, Head } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";

const TaskReview = ({ submission, task, classroom }) => {
    const { data, setData, put, processing, errors } = useForm({
        grade: submission.grade || "",
        feedback: submission.feedback || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(
            route("submissions.grade", {
                classroom: classroom.id,
                task: task.id,
                submission: submission.id,
            })
        );
    };

    const handleDownload = () => {
        window.location.href = route("submissions.download", {
            classroom: classroom.id,
            task: task.id,
            submission: submission.id,
        });
    };

    return (
        <Authenticated>
            <Head title={`Review Submission: ${submission.user.name}`} />
            <div className="container mx-auto mt-10 p-6 bg-white shadow-md">
                <h1 className="text-2xl font-bold mb-4 text-center">
                    Review Submission for {submission.user.name}
                </h1>

                <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Task Details</h2>
                    <p>
                        <strong>Task:</strong> {task.title}
                    </p>
                    <p>
                        <strong>Description:</strong> {task.description}
                    </p>
                </div>

                <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">
                        Submission Details
                    </h2>
                    <p>
                        <strong>Submitted at:</strong>{" "}
                        {new Date(submission.created_at).toLocaleString()}
                    </p>
                    {submission.notes && (
                        <p>
                            <strong>Student Notes:</strong> {submission.notes}
                        </p>
                    )}
                </div>

                <div className="mb-4">
                    <button
                        onClick={handleDownload}
                        className="bg-blue-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Download Submission
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Grade (0-100)
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={data.grade}
                            onChange={(e) => setData("grade", e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                            required
                        />
                        {errors.grade && (
                            <p className="text-red-500 text-xs italic">
                                {errors.grade}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Feedback
                        </label>
                        <textarea
                            value={data.feedback}
                            onChange={(e) =>
                                setData("feedback", e.target.value)
                            }
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                            rows="4"
                        />
                        {errors.feedback && (
                            <p className="text-red-500 text-xs italic">
                                {errors.feedback}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            {processing
                                ? "Saving..."
                                : "Save Grade and Feedback"}
                        </button>
                    </div>
                </form>
            </div>
        </Authenticated>
    );
};

export default TaskReview;

import React, { useState } from "react";
import { useForm, Head } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";

const SubmitTask = ({ task, classroom, existingSubmission = null }) => {
    const { data, setData, post, processing, errors } = useForm({
        file: null,
        notes: existingSubmission?.notes || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Prevent resubmission if already submitted
        if (existingSubmission) {
            alert("You have already submitted this task.");
            return;
        }

        const formData = new FormData();
        formData.append("file", data.file);
        formData.append("notes", data.notes);

        post(
            route("tasks.submit", {
                classroom: classroom.id,
                task: task.id,
            }),
            {
                forceFormData: true,
            }
        );
    };

    return (
        <Authenticated>
            <Head title={`Submit Task: ${task.title}`} />
            <div className="container mx-auto mt-10 p-6 bg-white shadow-md">
                <h1 className="text-2xl font-bold mb-4 text-center">
                    Submit Task: {task.title}
                </h1>
                <strong>
                    <p>{task.description}</p>
                </strong>
                <hr className="my-4" />

                {existingSubmission && (
                    <div>
                        <div className="flex justify-end mx-10 text-2xl">
                            <h2>
                                Grade:{" "}
                                {existingSubmission.grade || "Not graded"} /100
                            </h2>
                        </div>
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold">Feedback:</h2>
                            <p>
                                {existingSubmission.feedback ||
                                    "No feedback yet"}
                            </p>
                        </div>

                        <div className="mb-4">
                            <h2 className="text-lg font-semibold">
                                Submitted File:
                            </h2>
                            <p>
                                {existingSubmission.file_path
                                    ? "File submitted"
                                    : "No file submitted"}
                            </p>
                        </div>

                        <div className="mb-4">
                            <h2 className="text-lg font-semibold">
                                Submitted Notes:
                            </h2>
                            <p>
                                {existingSubmission.notes ||
                                    "No additional notes"}
                            </p>
                        </div>
                    </div>
                )}

                {!existingSubmission && (
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Upload File
                            </label>
                            <input
                                type="file"
                                onChange={(e) =>
                                    setData("file", e.target.files[0])
                                }
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                required
                            />
                            {errors.file && (
                                <p className="text-red-500 text-xs italic">
                                    {errors.file}
                                </p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Additional Notes
                            </label>
                            <textarea
                                value={data.notes}
                                onChange={(e) =>
                                    setData("notes", e.target.value)
                                }
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                rows="4"
                            />
                            {errors.notes && (
                                <p className="text-red-500 text-xs italic">
                                    {errors.notes}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                {processing ? "Submitting..." : "Submit Task"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </Authenticated>
    );
};

export default SubmitTask;

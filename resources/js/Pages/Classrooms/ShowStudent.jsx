// resources/js/Pages/Classrooms/ShowStudent.jsx

import React from "react";
import { Link, useForm } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";

const ShowStudent = ({ classroom }) => {
    const { delete: deleteStudent } = useForm(); // Menggunakan useForm dari Inertia.js untuk DELETE request

    const handleDelete = (studentId) => {
        if (
            window.confirm(
                "Are you sure you want to remove this student from the classroom?"
            )
        ) {
            deleteStudent(
                route("classrooms.students.destroy", [classroom.id, studentId]),
                {
                    onSuccess: () => {
                        alert(
                            "Student removed from the classroom successfully!"
                        );
                    },
                    onError: () => {
                        alert("Failed to remove student from the classroom.");
                    },
                }
            );
        }
    };

    return (
        <Authenticated>
            <div className="container flex">
                {/* Sidebar */}
                <div className="w-1/4 h-screen p-4 bg-gray-200">
                    <div className="bg-blue-600 text-center text-white p-2 my-3 border-2 rounded-lg hover:text-blue-600 hover:bg-transparent hover:border-2 hover:border-blue-600">
                        <Link href={`/dashboard`}>Dashboard</Link>
                    </div>
                    <div className="bg-blue-600 text-center text-white p-2 my-3 border-2 rounded-lg hover:text-blue-600 hover:bg-transparent hover:border-2 hover:border-blue-600">
                        <Link href={`/classrooms/page/${classroom.id}`}>Classroom</Link>
                    </div>
                    <h2 className="text-lg font-bold text-center">
                        Classrooms
                    </h2>
                    {/* Sidebar content for students and teachers */}
                    <ul>{/* Daftar kelas untuk siswa atau guru */}</ul>
                </div>

                {/* Main Content */}
                <div className="w-full p-6">
                    <div className="py-2 flex">
                        <div className="w-full sm:px-6 lg:px-8 flex flex-col justify-center">
                            <div className="overflow-hidden w-full bg-[#006DFF] shadow-sm sm:rounded-lg">
                                <div className="greeting p-9">
                                    <h1 className="text-white py-3 font-bold text-5xl">
                                        {classroom.name}
                                    </h1>
                                    <p className="tracking-wider text-white text-xl mb-3">
                                        Welcome to {classroom.name} classroom!
                                    </p>
                                    <hr />
                                    <h3 className="text-white text-lg font-semibold mt-3">
                                        Enrolled Students
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    {classroom.students.length > 0 ? (
                        <ul className="px-10">
                            {classroom.students.map((student) => (
                                <li
                                    key={student.id}
                                    className="text-black mt-2 bg-blue-200 p-2 rounded-md"
                                >
                                    <div className="flex justify-between">
                                        <div className="flex gap-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 320 512"
                                                className="w-10 h-10 fill-blue-600"
                                            >
                                                <path d="M112 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm40 304l0 128c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-223.1L59.4 304.5c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l58.3-97c17.4-28.9 48.6-46.6 82.3-46.6l29.7 0c33.7 0 64.9 17.7 82.3 46.6l58.3 97c9.1 15.1 4.2 34.8-10.9 43.9s-34.8 4.2-43.9-10.9L232 256.9 232 480c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-128-16 0z" />
                                            </svg>
                                            <div>
                                                {student.name}
                                                <br />
                                                {student.email}
                                            </div>
                                        </div>
                                        <button
                                            className="bg-red-600 rounded-md px-4 py-1 text-white"
                                            onClick={() =>
                                                handleDelete(student.id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600 text-center mt-28">
                            No students enrolled in this class.
                        </p>
                    )}
                </div>
            </div>
        </Authenticated>
    );
};

export default ShowStudent;

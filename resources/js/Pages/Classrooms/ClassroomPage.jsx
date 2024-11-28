import React, { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import axios from "axios";

export default function ClassroomPage() {
    const { classroom } = usePage().props;
    const { user } = usePage().props.auth;

    const [tasks, setTasks] = useState([]);
    const [materials, setMaterials] = useState([]); // State untuk materials
    const [isLoadingTasks, setIsLoadingTasks] = useState(true);
    const [isLoadingMaterials, setIsLoadingMaterials] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(
                    `/classrooms/${classroom.id}/show`
                );
                setTasks(response.data.tasks || []);
            } catch (error) {
                console.error(
                    "Error fetching tasks:",
                    error.response ? error.response.data : error.message
                );
                // Optionally set an error state to show to the user
            } finally {
                setIsLoadingTasks(false);
            }
        };

        const fetchMaterials = async () => {
            try {
                const response = await axios.get(
                    `/classrooms/${classroom.id}/show`
                );
                setMaterials(response.data.materials || []);
            } catch (error) {
                console.error(
                    "Error fetching materials:",
                    error.response ? error.response.data : error.message
                );
                // Optionally set an error state to show to the user
            } finally {
                setIsLoadingMaterials(false);
            }
        };

        if (classroom?.id) {
            fetchTasks();
            fetchMaterials();
        }
    }, [classroom?.id]);

    const isTeacher = user.role === "teacher";

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this classroom?")) {
            axios
                .delete(`/classrooms/${id}`)
                .then(() => {
                    alert("Classroom deleted successfully.");
                    window.location.href = "/dashboard";
                })
                .catch((error) => {
                    console.error("Error deleting classroom:", error);
                    alert("Failed to delete classroom.");
                });
        }
    };

    return (
        <Authenticated>
            <div className="container flex">
                {/* Sidebar */}
                <div className="w-1/4 h-svh p-4 bg-gray-200">
                    <div className="bg-blue-600 text-center text-white p-2 my-3 border-2 rounded-lg hover:text-blue-600 hover:bg-transparent hover:border-2 hover:border-blue-600">
                        <Link href={`/dashboard`}>Dashboard</Link>
                    </div>
                    <h2 className="text-lg font-bold text-center">
                        My Classrooms
                    </h2>
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
                                        {isTeacher ? (
                                            <span>
                                                Welcome, Teacher! Here's your
                                                classroom management dashboard.
                                            </span>
                                        ) : (
                                            <span>
                                                Welcome to {classroom.name}{" "}
                                                classroom. Stay engaged and keep
                                                learning!
                                            </span>
                                        )}
                                    </p>
                                    <hr />
                                    <p className="text-md text-white mt-3">
                                        Teacher: {classroom.teacher?.name}
                                    </p>
                                    <p className="text-md text-white">
                                        Description: {classroom.description}
                                    </p>

                                    {isTeacher && (
                                        <div className="mt-4">
                                            <p className="text-md text-white font-semibold">
                                                Enrollment Key:{" "}
                                                {classroom.enrollkeyment}
                                            </p>
                                        </div>
                                    )}

                                    {isTeacher && (
                                        <div className="button-teacher flex justify-end mt-3">
                                            <Link
                                                href={`/classrooms/${classroom.id}/materials/create`}
                                            >
                                                <div className="bg-white px-7 py-2 mx-3 text-blue-600 border-2 rounded-lg hover:text-white hover:bg-transparent hover:border-2">
                                                    Create Material
                                                </div>
                                            </Link>
                                            <Link
                                                href={`/classrooms/${classroom.id}/tasks/create`}
                                            >
                                                <div className="bg-white px-7 py-2 mx-3 text-blue-600 border-2 rounded-lg hover:text-white hover:bg-transparent hover:border-2">
                                                    Add Task
                                                </div>
                                            </Link>
                                            <Link
                                                href={`/classrooms/${classroom.id}/students`}
                                            >
                                                <div className="bg-white px-7 py-2 mx-3 text-blue-600 border-2 rounded-lg hover:text-white hover:bg-transparent hover:border-2">
                                                    All Student
                                                </div>
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(classroom.id)
                                                }
                                                className="bg-red-600 px-7 py-2 mx-3 text-white border-2 rounded-lg hover:text-red-600 hover:bg-transparent hover:border-red-600"
                                            >
                                                Delete Classroom
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        {/* Materials Section */}
                        <div className="mt-6">
                            <h3 className="text-lg font-bold">Materials</h3>
                            {isLoadingMaterials ? (
                                <p>Loading materials...</p>
                            ) : materials && materials.length > 0 ? (
                                materials.map((material) => (
                                    <div
                                        className="bg-blue-200 p-4 rounded-md mb-3"
                                        key={material.id}
                                    >
                                        <Link
                                            href={`/materials/${material.id}/showpage`}
                                        >
                                            <div className="flex gap-5 items-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 512 512"
                                                    className="w-10 h-10"
                                                >
                                                    <path d="M96 0C43 0 0 43 0 96L0 416c0 53 43 96 96 96l288 0 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-64c17.7 0 32-14.3 32-32l0-320c0-17.7-14.3-32-32-32L384 0 96 0zm0 384l256 0 0 64L96 448c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16l192 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16zm16 48l192 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
                                                </svg>
                                                <div>
                                                    <h2 className="text-2xl">
                                                        {
                                                            material.material_title
                                                        }
                                                    </h2>
                                                    <p className="text-gray-600">
                                                        {material.created_at}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <p>No materials available</p>
                            )}
                        </div>

                        {/* Tasks Section */}
                        <div className="classPage mt-6">
                            <h3 className="text-lg font-bold">Assignments</h3>
                            {isLoadingTasks ? (
                                <p>Loading tasks...</p>
                            ) : tasks && tasks.length > 0 ? (
                                tasks.map((task) => (
                                    <div
                                        className="bg-blue-200 p-4 rounded-md mb-2"
                                        key={task.id}
                                    >
                                        <Link
                                            href={
                                                user.role === "teacher"
                                                    ? `/tasks/${task.id}/showpage`
                                                    : `/classrooms/${classroom.id}/tasks/${task.id}/submit`
                                            }
                                        >
                                            <div className="flex gap-5 items-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 512 512"
                                                    className="w-10 h-10"
                                                >
                                                    <path d="M152.1 38.2c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 113C-2.3 103.6-2.3 88.4 7 79s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zm0 160c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 273c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zM224 96c0-17.7 14.3-32 32-32l224 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-224 0c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32l224 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-224 0c-17.7 0-32-14.3-32-32zM160 416c0-17.7 14.3-32 32-32l288 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-288 0c-17.7 0-32-14.3-32-32zM48 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                                                </svg>
                                                <div>
                                                    <h2 className="text-2xl">
                                                        {task.title}
                                                    </h2>
                                                    <p className="text-red-500">
                                                        Due date:{" "}
                                                        {task.due_date}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <p>No tasks available</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="buttonChat fixed bottom-5 right-5 z-50">
                    <Link href={`/classrooms/${classroom.id}/chats`}>
                        <button className="group text-md p-3 border-2 rounded-tl-2xl rounded-br-2xl rounded-bl-2xl flex bg-[#006DFF] hover:border-[#006DFF] hover:bg-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                                width="40"
                                height="25"
                                className="fill-white group-hover:fill-[#006DFF]"
                            >
                                <path d="M208 352c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176c0 38.6 14.7 74.3 39.6 103.4c-3.5 9.4-8.7 17.7-14.2 24.7c-4.8 6.2-9.7 11-13.3 14.3c-1.8 1.6-3.3 2.9-4.3 3.7c-.5 .4-.9 .7-1.1 .8l-.2 .2s0 0 0 0s0 0 0 0C1 327.2-1.4 334.4 .8 340.9S9.1 352 16 352c21.8 0 43.8-5.6 62.1-12.5c9.2-3.5 17.8-7.4 25.2-11.4C134.1 343.3 169.8 352 208 352zM448 176c0 112.3-99.1 196.9-216.5 207C255.8 457.4 336.4 512 432 512c38.2 0 73.9-8.7 104.7-23.9c7.5 4 16 7.9 25.2 11.4c18.3 6.9 40.3 12.5 62.1 12.5c6.9 0 13.1-4.5 15.2-11.1c2.1-6.6-.2-13.8-5.8-17.9c0 0 0 0 0 0s0 0 0 0l-.2-.2c-.2-.2-.6-.4-1.1-.8c-1-.8-2.5-2-4.3-3.7c-3.6-3.3-8.5-8.1-13.3-14.3c-5.5-7-10.7-15.4-14.2-24.7c24.9-29 39.6-64.7 39.6-103.4c0-92.8-84.9-168.9-192.6-175.5c.4 5.1 .6 10.3 .6 15.5z" />
                            </svg>
                            <span className="ml-2 text-white font-bold group-hover:text-[#006DFF]">
                                Group Chat
                            </span>
                        </button>
                    </Link>
                </div>
            </div>
        </Authenticated>
    );
}

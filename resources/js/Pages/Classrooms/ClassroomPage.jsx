import React from "react";
import { usePage } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";

export default function ClassroomPage() {
    const { classroom } = usePage().props;
    const { user } = usePage().props.auth;

    if (!classroom) {
        return <div>Loading...</div>;
    }

    const isTeacher = user.role === "teacher";
    return (
        <Authenticated>
            <div className="container flex">
                {/* Sidebar */}
                <div className="w-1/4 h-svh p-4 bg-gray-200">
                    <h2 className="text-lg font-bold text-center">
                        My Classrooms
                    </h2>
                    <ul>
                        {user.role === "student" ? (
                            classroom.students &&
                            classroom.students.length > 0 ? (
                                classroom.students.map((classroom) => (
                                    <div
                                        className="side bg-blue-300 p-2 border-l-4 border-blue-800"
                                        key={classroom.id}
                                    >
                                        <li className="p-2">
                                            <a
                                                href={`/classrooms/${classroom.id}`}
                                                className="text-lg"
                                            >
                                                {classroom.name}
                                            </a>
                                            <hr />
                                            <ul className="my-3">
                                                <li>Materials</li>
                                                <li>Assignments</li>
                                            </ul>
                                        </li>
                                    </div>
                                ))
                            ) : (
                                <p>No classrooms available</p>
                            )
                        ) : user.role === "teacher" ? (
                            classroom.teachers &&
                            classroom.teachers.length > 0 ? (
                                classroom.teachers.map((classroom) => (
                                    <div
                                        className="side bg-green-300 p-2 border-l-4 border-green-800"
                                        key={classroom.id}
                                    >
                                        <li className="p-2">
                                            <a
                                                href={`/classrooms/${classroom.id}`}
                                                className="text-lg"
                                            >
                                                {classroom.name}
                                            </a>
                                            <hr />
                                            <ul className="my-3">
                                                <li>Materials</li>
                                                <li>Assignments</li>
                                            </ul>
                                        </li>
                                    </div>
                                ))
                            ) : (
                                <p>No classrooms available</p>
                            )
                        ) : (
                            <p>Invalid user role</p>
                        )}
                    </ul>
                </div>

                {/* Main Content */}
                <div className="w-full p-6 ">
                    <div className="py-2 flex ">
                        <div className="w-full sm:px-6 lg:px-8 flex flex-col justify-center ">
                            <div className="overflow-hidden w-full bg-[#006DFF] shadow-sm sm:rounded-lg ">
                                <div className="greeting p-9 ">
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
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="mt-6">
                            <h3 className="text-lg font-bold">Materials</h3>
                            {classroom.materials &&
                            classroom.materials.length > 0 ? (
                                classroom.materials.map((material) => (
                                    <div key={material.id}>{material.name}</div>
                                ))
                            ) : (
                                <p>No materials available</p>
                            )}
                        </div>

                        <div className="mt-6">
                            <h3 className="text-lg font-bold">Assignments</h3>
                            {classroom.assignments &&
                            classroom.assignments.length > 0 ? (
                                classroom.assignments.map((assignment) => (
                                    <div key={assignment.id}>
                                        {assignment.title}
                                    </div>
                                ))
                            ) : (
                                <p>No assignments available</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}

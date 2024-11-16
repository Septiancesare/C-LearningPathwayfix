import ClassroomStudent from "@/Components/ClassroomStudent";
import ClassroomTeacher from "@/Components/ClassroomTeacher";
import Greeting from "@/Components/Greeting";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react"; // Ensure useState and useEffect are imported

export default function Dashboard() {
    const user = usePage().props.auth.user; // Get the current user from Inertia's props
    const [classrooms, setClassrooms] = useState([]); // State to store classrooms

    useEffect(() => {
        if (user.role === "teacher") {
            // Fetch classrooms for the teacher when the role is 'teacher'
            fetch("/classrooms/teacher")
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(
                            `HTTP error! Status: ${response.status}`
                        );
                    }
                    return response.json();
                })
                .then((data) => {
                    setClassrooms(data);
                })
                .catch((error) => {
                    console.error("Error fetching classrooms:", error);
                });
        }
    }, [user.role]); // Dependency array ensures the effect runs when the user role changes

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <Greeting />

            <div className="container flex flex-col justify-center">
                {user.role === "student" && (
                    <>
                        <div className="buttonCreate flex justify-end sm:px-6 lg:px-8 mb-3">
                            <Link href={route("classrooms.join.form")}>
                                <button className="group text-md p-2 rounded-xl flex bg-[#006DFF] border-4 hover:text-[#006DFF] hover:border-[#006DFF] hover:bg-white hover:bg-opacity-10">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512"
                                        width="25"
                                        height="25"
                                        className="fill-white group-hover:fill-[#006DFF]"
                                    >
                                        <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z" />
                                    </svg>
                                    <span className="ml-2 text-[#ffffff] font-bold group-hover:text-[#006DFF]">
                                        Join Class
                                    </span>
                                </button>
                            </Link>
                        </div>
                        <div className="buttonJoinClass"></div>
                        <ClassroomStudent
                            mapel="Fisika"
                            guru="Budi Santoso, S. Pd."
                        />
                        <ClassroomStudent
                            mapel="Matematika"
                            guru="Vania, S. Pd."
                        />
                        <ClassroomStudent
                            mapel="Informatika"
                            guru="Roni Kurniawan, S. Pd."
                        />
                    </>
                )}

                {user.role === "teacher" && (
                    <>
                        <div className="buttonCreate flex justify-end sm:px-6 lg:px-8 mb-3">
                            <Link href="/classrooms/create">
                                <button className="group text-md p-2 rounded-xl flex bg-[#006DFF] border-4 hover:text-[#006DFF] hover:border-[#006DFF] hover:bg-white hover:bg-opacity-10">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512"
                                        width="25"
                                        height="25"
                                        className="fill-white group-hover:fill-[#006DFF]"
                                    >
                                        <path d="M64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16L64 80zM0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM200 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                                    </svg>
                                    <span className="ml-2 text-[#ffffff] font-bold group-hover:text-[#006DFF]">
                                        Create New Class
                                    </span>
                                </button>
                            </Link>
                        </div>
                        {classrooms.length > 0 ? (
                            classrooms.map((classroom) => (
                                <ClassroomTeacher
                                    key={classroom.id}
                                    mapel={classroom.name}
                                    createdAt={classroom.created_at}
                                />
                            ))
                        ) : (
                            <div className="flex justify-center my-40">
                                <p className="text-gray-400">
                                    <strong>No classrooms found.</strong>
                                </p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </AuthenticatedLayout>
    );
}

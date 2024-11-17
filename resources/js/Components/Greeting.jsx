import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";

export default function Greeting() {
    const user = usePage().props.auth.user;
    const isTeacher = user.role === "teacher"; // Assuming 'teacher' is the role

    return (
        <div className="py-5 flex">
            <div className=" sm:px-6 lg:px-8 flex flex-col justify-center">
                <div className="overflow-hidden w-full bg-[#006DFF] shadow-sm sm:rounded-lg">
                    <div className="greeting p-9 ">
                        <h1 className="text-white py-3 font-bold text-5xl">
                            Hallo, {user.name} !
                        </h1>
                        <p className="tracking-wider text-white text-xl">
                            {isTeacher ? (
                                <>
                                    <span>
                                        Welcome, Teacher! Your role is vital in
                                        shaping the minds of future generations.
                                        Thank you for your dedication to
                                        education and the incredible work you do
                                        to inspire and guide your students.
                                    </span>
                                    <br />
                                    <span className="font-bold text-xl mt-4">
                                        Keep up the great work, wishing you
                                        success in every step you take! Continue
                                        sharing knowledge and inspiring for a
                                        brighter future ahead!
                                    </span>
                                </>
                            ) : (
                                <>
                                    <span>
                                        Welcome to C-LearningPathway, where your
                                        adventure toward knowledge and success
                                        takes flight! Embrace the power of
                                        curiosity, fuel your drive with
                                        determination, and together, let’s
                                        strive for excellence and greatness. The
                                        path ahead is filled with endless
                                        learning opportunities, so keep pushing
                                        forward and unlock your full potential
                                        every step of the way!
                                    </span>
                                </>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { Head, Link } from "@inertiajs/react";
export default function landing() {
    return (
        <>
            <Head title="C-Learn Auth" />
            <div className="container bg-[#FFFFFF] w-screen h-screen flex flex-col items-center justify-center">
                <div className="logo py-7 flex flex-row items-center justify-center">
                    <img
                        src="images/logo biru.png"
                        alt="Logo Biru"
                        className="w-44 px-5"
                    />
                    <h1 className="px-7 font-nunito font-bold tracking-widest text-bold text-[#006DFF] text-4xl">
                        C-LearningPathway
                    </h1>
                </div>
                <div className="buttonSign flex space-x-4 mt-4">
                    <Link
                        href={route("login")}
                        className="rounded-full px-24 py-3 text-xl bg-[#006DFF] text-white hover:bg-[#0052CC] transition"
                    >
                        Sign in
                    </Link>
                    <Link
                        href={route("register")}
                        className="rounded-md px-24 py-3 text-xl text-[#006DFF]  hover:text-cyan-900 transition"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </>
    );
}

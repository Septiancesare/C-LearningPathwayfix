import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-[#006DFF] pt-6 sm:justify-center sm:pt-0">
            <div>
                <div className="logo py-3 flex flex-row items-center justify-center">
                    <img
                        src="images/logo putih.png"
                        alt="Logo Biru"
                        className="w-32 px-5"
                    />
                    <h1 className="px-7 font-nunito font-bold tracking-widest text-bold text-[#ffffff] text-4xl">
                        C-LearningPathway
                    </h1>
                </div>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}

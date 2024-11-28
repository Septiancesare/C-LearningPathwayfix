import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import ChatComponent from "@/Components/ChatComponent"; // Import the ChatComponent

export default function ChatPage({ classId, nameClass }) {
    const { user } = usePage().props.auth;

    return (
        <Authenticated>
            <div className="container mx-auto  text-center ">
                <div className="flex justify-evenly items-center bg-blue-600">
                    <Link href={`/classrooms/page/${classId}`}>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-blue-700"
                        >
                            Back
                        </button>
                    </Link>

                    <div className="bg-blue-600 py-4 w-4/5">
                        <h2 className="text-2xl font-bold text-white">
                            {nameClass}
                        </h2>
                    </div>
                </div>
                {/* ChatComponent renders the chat interface */}
                <ChatComponent classId={classId} />
            </div>
        </Authenticated>
    );
}

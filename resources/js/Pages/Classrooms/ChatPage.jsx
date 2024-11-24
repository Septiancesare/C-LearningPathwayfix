import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import ChatComponent from "@/Components/ChatComponent"; // Import the ChatComponent

export default function ChatPage({ classId }) {
    const { user } = usePage().props.auth; // Fetch authenticated user from the context

    return (
        <Authenticated>
            <div className="container mx-auto p-10 text-center ">
                <h2 className="text-2xl font-bold">Group Chat </h2>

                {/* ChatComponent renders the chat interface */}
                <ChatComponent classId={classId} />
            </div>
        </Authenticated>
    );
}

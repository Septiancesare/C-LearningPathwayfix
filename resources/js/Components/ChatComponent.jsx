import React, { useState, useEffect } from "react";

const ChatComponent = ({ classId }) => {
    const [chats, setChats] = useState([]); // Initialize as an empty array
    const [newMessage, setNewMessage] = useState("");
    const currentUserId = 1; // Replace with actual user ID from context or props

    useEffect(() => {
        fetchChats();
    }, []); // Empty dependency array to fetch chats only once when component mounts

    const fetchChats = async () => {
        try {
            const response = await fetch(`/classrooms/${classId}/chats`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const text = await response.text(); // Get raw response as text

            if (!response.ok) {
                throw new Error(
                    `Failed to fetch chats: ${response.statusText}`
                );
            }

            try {
                const data = JSON.parse(text); // Try parsing the text as JSON
                console.log("Chats data:", data);
                if (Array.isArray(data)) {
                    setChats(data);
                } else {
                    console.error("Fetched data is not an array:", data);
                }
            } catch (jsonError) {
                console.error("Failed to parse JSON:", jsonError);
                console.log("Response was:", text); // Log the raw response for debugging
            }
        } catch (error) {
            console.error("Error fetching chats:", error);
        }
    };

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return; // Prevent sending empty messages

        try {
            const response = await fetch(`/classrooms/${classId}/chats`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: newMessage,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to send message");
            }

            const data = await response.json();
            console.log("Message sent:", data);

            // Ensure the response data is valid before updating the state
            if (data && data.id) {
                setChats((prevChats) => [...prevChats, data]); // Add new chat message to the state
                setNewMessage(""); // Clear the input after sending
            } else {
                console.error("Invalid response format:", data);
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="flex flex-col h-full max-w-3xl mx-auto">
            {/* Chat Messages */}
            <div
                className="flex-grow p-6 overflow-y-auto mb-4"
                style={{ maxHeight: "calc(100vh - 160px)" }}
            >
                {chats.length > 0 ? (
                    chats.map((chat) => (
                        <div
                            key={chat.id}
                            className={`flex mb-4 ${
                                chat.user_id === currentUserId
                                    ? "justify-end"
                                    : "justify-start"
                            }`}
                        >
                            <div
                                className={`max-w-xs p-4 rounded-lg shadow-md ${
                                    chat.user_id === currentUserId
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200 text-gray-900"
                                }`}
                            >
                                <div className="text-sm font-semibold">
                                    {chat.user.name} - {chat.user.role}
                                </div>
                                <div className="mt-2">{chat.message}</div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No messages yet.</p>
                )}
            </div>

            {/* Chat Input */}
            <div className="flex items-center p-4 bg-gray-100 border-t-2">
                <input
                    type="text"
                    className="flex-grow px-4 py-2 mr-2 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message"
                />
                <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatComponent;

import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllChat, getRespondFromAi } from "../axios/chatRequest";
import { addLocalMessage } from "../redux/chatSlice";
import AppHeader from "./AppHeader";

const Chat = () => {
    const [apiKeyEnabled, setApiKeyEnabled] = useState(false);
    const [message, setMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const location = useLocation();
    const { pdfId, pdfTitle, pdfText } = location.state || {};
    const chat = useSelector((state) => state.chat.chat);
    const dispatch = useDispatch();
    const chatEndRef = useRef(null);

    useEffect(() => {
        dispatch(getAllChat({ pdf_id: pdfId }));
    }, [dispatch, pdfId]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat]);

    const handleSend = (e) => {
        e.preventDefault();
        if (message.trim()) {
            const updatedChat = [...chat, { role: "user", content: message }];
            dispatch(addLocalMessage({ role: "user", content: message }));

            // Show typing animation for AI
            setIsTyping(true);

            dispatch(getRespondFromAi({
                chats: updatedChat,
                pdf: { id: pdfId, title: pdfTitle, text: pdfText },
                flag: apiKeyEnabled
            })).finally(() => {
                setIsTyping(false);
            });

            setMessage("");
        }
    };
    function onToggleApiKey() {
        setApiKeyEnabled((prev) => !prev);
        console.log("API Key Enabled:", !apiKeyEnabled);
    }
    return (
        <div>
            <AppHeader />
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4">
            <div className="bg-white/70 backdrop-blur-lg shadow-2xl rounded-2xl w-full max-w-4xl flex flex-col h-[85vh] overflow-hidden border border-gray-200">
                {/* Sticky Header */}
                <div className="flex bg-blue-600 text-white py-4 px-6 text-lg font-semibold shadow-md sticky top-0 z-10">
                    <div>
                    <span>Chat about: {pdfTitle}</span>
                    </div>
                    <div className="ml-auto">
                        <span className="" >Enable Using API Key</span>
                    </div>
                    <div className="ml-3 py-0">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                    value={apiKeyEnabled}
                                    onChange={onToggleApiKey}
                            />
                            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-black transition-colors duration-300"></div>
                            <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5"></span>
                        </label>

                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {chat && chat.length > 0 ? (
                        chat.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex items-start gap-3 transition-all duration-300 ${msg.role === "user" ? "justify-end" : "justify-start"
                                    }`}
                            >
                                {/* Avatar */}
                                {msg.role !== "user" && (
                                    <div className="h-9 w-9 bg-gray-400 text-white flex items-center justify-center rounded-full text-sm font-bold">
                                        AI
                                    </div>
                                )}

                                {/* Message Bubble */}
                                <div
                                    className={`px-5 py-3 rounded-2xl max-w-[70%] shadow-md ${msg.role === "user"
                                            ? "bg-blue-500 text-white rounded-br-none"
                                            : "bg-gray-200 text-gray-900 rounded-bl-none"
                                        }`}
                                >
                                    {msg.content}
                                </div>

                                {msg.role === "user" && (
                                    <div className="h-9 w-9 bg-blue-500 text-white flex items-center justify-center rounded-full text-sm font-bold">
                                        U
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="text-gray-500 text-center py-8">No messages yet.</div>
                    )}

                    {/* Typing Animation */}
                    {isTyping && (
                        <div className="flex items-center gap-2 text-gray-500">
                            <div className="h-8 w-8 bg-gray-400 rounded-full flex items-center justify-center text-white text-sm">
                                AI
                            </div>
                            <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                            </div>
                        </div>
                    )}

                    <div ref={chatEndRef} />
                </div>

                {/* Input Bar */}
                <form onSubmit={handleSend} className="p-3 bg-white border-t">
                    <div className="flex items-center bg-gray-100 rounded-full px-3 py-2 shadow-inner">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            className="flex-1 px-3 py-2 bg-transparent outline-none text-gray-700"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 transition"
                        >
                            ➤
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    );
};

export default Chat;

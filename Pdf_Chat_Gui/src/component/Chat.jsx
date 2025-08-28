import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllChat, getRespondFromAi } from "../axios/chatRequest";
import { addLocalMessage } from "../redux/chatSlice";
import AppHeader from "./AppHeader";
import ReactMarkdown from "react-markdown";

const Chat = () => {
    const [apiKeyEnabled, setApiKeyEnabled] = useState(false);
    const [message, setMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const MAX_MESSAGE_LENGTH = 2000;
    const [copiedIdx, setCopiedIdx] = useState(null);
    const [sendError, setSendError] = useState("");
    const [showApiHint, setShowApiHint] = useState(true);
    const [showScrollToBottom, setShowScrollToBottom] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { pdfId, pdfTitle, pdfText } = location.state || {};
    const chat = useSelector((state) => state.chat.chat);
    const dispatch = useDispatch();
    const chatEndRef = useRef(null);
    const messagesRef = useRef(null);
    const textareaRef = useRef(null);

    useEffect(() => {
        dispatch(getAllChat({ pdf_id: pdfId }));
    }, [dispatch, pdfId]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat]);

    useEffect(() => {
        const container = messagesRef.current;
        if (!container) return;
        const onScroll = () => {
            const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
            setShowScrollToBottom(distanceFromBottom > 120);
        };
        container.addEventListener('scroll', onScroll);
        return () => container.removeEventListener('scroll', onScroll);
    }, []);

    const handleSend = (e) => {
        e?.preventDefault?.();
        const trimmed = message.trim();
        if (!trimmed) return;
        const updatedChat = [...chat, { role: "user", content: trimmed }];
        dispatch(addLocalMessage({ role: "user", content: trimmed }));

        setIsTyping(true);
        dispatch(getRespondFromAi({
            chats: updatedChat,
            pdf: { id: pdfId, title: pdfTitle, text: pdfText },
            flag: apiKeyEnabled
        }))
        .unwrap()
        .then(() => {
            setSendError("");
        })
        .catch((err) => {
            const msg = typeof err === 'string' ? err : (err?.message || err?.error || 'Failed to get response. Please try again.');
            setSendError(msg);
        })
        .finally(() => {
            setIsTyping(false);
        });
        setMessage("");
        if (textareaRef.current) {
            textareaRef.current.style.height = '40px';
        }
    };

    function onToggleApiKey() {
        setApiKeyEnabled((prev) => !prev);
        console.log("API Key Enabled:", !apiKeyEnabled);
    }

    function onKeyDown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    }

    function autoResize(e) {
        const el = e.target;
        el.style.height = 'auto';
        el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
    }

    async function handleCopy(content, idx) {
        try {
            await navigator.clipboard.writeText(content);
            setCopiedIdx(idx);
            setTimeout(() => setCopiedIdx(null), 1200);
        } catch (err) {
            console.error('Copy failed', err);
        }
    }

    function scrollToBottom() {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    function handleRetry() {
        if (!pdfId) return;
        setIsTyping(true);
        dispatch(getRespondFromAi({
            chats: chat,
            pdf: { id: pdfId, title: pdfTitle, text: pdfText },
            flag: apiKeyEnabled
        }))
        .unwrap()
        .then(() => setSendError(""))
        .catch((err) => {
            const msg = typeof err === 'string' ? err : (err?.message || err?.error || 'Failed to get response. Please try again.');
            setSendError(msg);
        })
        .finally(() => setIsTyping(false));
    }

    return (
        <div>
            <AppHeader />
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4">
            <div className="bg-white/70 backdrop-blur-lg shadow-2xl rounded-2xl w-full max-w-4xl flex flex-col h-[85vh] overflow-hidden border border-gray-200">
                {/* Sticky Header */}
                <div className="flex items-center gap-3 bg-blue-600 text-white py-4 px-6 text-lg font-semibold shadow-md sticky top-0 z-10">
                    <button
                        onClick={() => navigate(-1)}
                        className="mr-1 rounded-full bg-white/10 hover:bg-white/20 p-2 transition"
                        aria-label="Go back"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 14.707a1 1 0 01-1.414 0L6.586 10l4.707-4.707a1 1 0 011.414 1.414L9.414 10l3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd"/></svg>
                    </button>
                    <div className="truncate">
                        <span className="opacity-90 text-sm block">Chat about</span>
                        <span className="truncate block">{pdfTitle}</span>
                    </div>
                    <div className="ml-auto flex items-center gap-3">
                        <span className="text-sm opacity-90 hidden sm:block">Enable Using API Key</span>
                        <label className="relative inline-flex items-center cursor-pointer select-none">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={apiKeyEnabled}
                                onChange={onToggleApiKey}
                            />
                            <div className="w-11 h-6 bg-white/30 rounded-full peer peer-checked:bg-green-500 transition-colors duration-300"></div>
                            <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 peer-checked:translate-x-5"></span>
                        </label>
                    </div>
                </div>

                {/* API Key Hint */}
                {!apiKeyEnabled && showApiHint && (
                    <div className="px-4 py-3 bg-blue-50 border-b border-blue-200 text-blue-800 flex items-center gap-3">
                        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM9 7a1 1 0 012 0v5a1 1 0 11-2 0V7zm1 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/></svg>
                        <span className="text-sm flex-1">For better quality responses, add your OpenRouter API key and model in Settings, or toggle "Enable Using API Key" above.</span>
                        <button onClick={() => navigate('/settings')} className="text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">Open Settings</button>
                        <button onClick={() => setShowApiHint(false)} className="text-sm px-2 py-1 text-blue-700 hover:text-blue-900">Dismiss</button>
                    </div>
                )}

                {/* Error Banner */}
                {sendError && (
                    <div className="px-4 py-3 bg-red-50 border-b border-red-200 text-red-700 flex items-center gap-3">
                        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-5.5a.75.75 0 001.5 0v-5a.75.75 0 00-1.5 0v5zM10 14.75a.875.875 0 100-1.75.875.875 0 000 1.75z" clipRule="evenodd"/></svg>
                        <span className="text-sm flex-1">{sendError}</span>
                        <button onClick={handleRetry} disabled={isTyping} className="text-sm px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-60">Retry</button>
                        <button onClick={() => setSendError("")} className="text-sm px-2 py-1 text-red-700 hover:text-red-800">Dismiss</button>
                    </div>
                )}

                {/* Messages */}
                <div ref={messagesRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                    {chat && chat.length > 0 ? (
                        chat.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex items-start gap-3 transition-all duration-300 ${msg.role === "user" ? "justify-end" : "justify-start"
                                    }`}
                            >
                                {/* Avatar */}
                                {msg.role !== "user" && (
                                    <div className="h-9 w-9 bg-gray-600 text-white flex items-center justify-center rounded-full text-sm font-bold">
                                        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a6 6 0 00-6 6v2a2 2 0 01-2 2h2v2a4 4 0 004 4h4a4 4 0 004-4v-2h2a2 2 0 01-2-2V8a6 6 0 00-6-6z"/></svg>
                                    </div>
                                )}

                                {/* Message Bubble */}
                                <div
                                    className={`px-5 py-3 rounded-2xl max-w-[70%] shadow-md relative group ${msg.role === "user"
                                            ? "bg-blue-500 text-white rounded-br-none"
                                            : "bg-gray-50 text-gray-900 rounded-bl-none border border-gray-200"
                                        }`}
                                >
                                    <div className={`text-sm leading-relaxed ${msg.role !== 'user' ? 'prose prose-sm prose-slate max-w-none' : ''}`}>
                                        <ReactMarkdown
                                            components={{
                                                code({ inline, children, ...props }) {
                                                    const effectiveClass = inline ? 'px-1 py-0.5 rounded bg-gray-200 text-gray-800' : 'block p-3 rounded-lg bg-gray-900 text-gray-100 overflow-auto';
                                                    return (
                                                        <code className={`${effectiveClass}`} {...props}>
                                                            {children}
                                                        </code>
                                                    );
                                                },
                                                a(props) {
                                                    return <a className="text-blue-600 underline hover:text-blue-700" {...props} />
                                                }
                                            }}
                                        >
                                            {msg.content}
                                        </ReactMarkdown>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleCopy(msg.content, idx)}
                                        className={`absolute -top-3 ${msg.role === 'user' ? '-left-3' : '-right-3'} opacity-0 group-hover:opacity-100 transition bg-white shadow px-2 py-1 rounded text-xs text-gray-600 hover:text-gray-800 border border-gray-200`}
                                        title="Copy message"
                                    >
                                        {copiedIdx === idx ? 'Copied' : 'Copy'}
                                    </button>
                                </div>

                                {msg.role === "user" && (
                                    <div className="h-9 w-9 bg-blue-500 text-white flex items-center justify-center rounded-full text-sm font-bold">
                                        U
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="text-gray-500 text-center py-8">No messages yet. Start the conversation below.</div>
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

                {showScrollToBottom && (
                    <button
                        onClick={scrollToBottom}
                        className="absolute bottom-24 right-6 bg-white shadow-lg border border-gray-200 rounded-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                        aria-label="Scroll to bottom"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M10 14l-4-4h8l-4 4z"/></svg>
                        New messages
                    </button>
                )}

                {/* Input Bar */}
                <form onSubmit={handleSend} className="p-3 bg-white border-t">
                    <div className="flex items-end bg-gray-100 rounded-2xl px-3 py-2 shadow-inner gap-2">
                        <textarea
                            ref={textareaRef}
                            rows={1}
                            placeholder="Type your message... (Shift+Enter for new line)"
                            className="flex-1 px-3 py-2 bg-transparent outline-none text-gray-700 resize-none max-h-36"
                            value={message}
                            onChange={(e) => {
                                const next = e.target.value.slice(0, MAX_MESSAGE_LENGTH);
                                setMessage(next);
                                autoResize(e);
                            }}
                            onKeyDown={onKeyDown}
                            disabled={isTyping}
                            style={{ height: 40 }}
                        />
                        <div className="flex flex-col items-end gap-1">
                            <div className="text-xs text-gray-500 select-none">{message.length}/{MAX_MESSAGE_LENGTH}</div>
                            <button
                                type="submit"
                                disabled={!message.trim() || isTyping}
                                className={`rounded-full p-3 transition ${(!message.trim() || isTyping) ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-white shadow`}
                                aria-label="Send message"
                                title={!message.trim() ? 'Type a message to send' : isTyping ? 'Please wait...' : 'Send message'}
                            >
                                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2.94 2.94a.75.75 0 01.78-.18l13.5 5.25a.75.75 0 010 1.38L9.9 11.46l-2.07 7.03a.75.75 0 01-1.43.06L2.76 3.72a.75.75 0 01.18-.78zM4.4 4.9l3.4 10.2.96-3.26a.75.75 0 01.48-.5l5.84-2.04-10.68-4.4z"/></svg>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

    );
};

export default Chat;

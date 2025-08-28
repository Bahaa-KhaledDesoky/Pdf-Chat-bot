import { useDispatch, useSelector } from "react-redux";
import AppHeader from "./AppHeader";
import { useState, useEffect } from "react";
import { AddModel } from "../axios/userRequstes";

const Setting = () => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user?.user?.id);
    const status = useSelector((state) => state.user.status);
    const error = useSelector((state) => state.user.error);
    
    const [modelName, setModelName] = useState("");
    const [apiKey, setApiKey] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showApiKey, setShowApiKey] = useState(false);
    const [localError, setLocalError] = useState("");

    // Clear errors when user starts typing
    useEffect(() => {
        if (localError || error) {
            setLocalError("");
        }
    }, [modelName, apiKey, error]);

    function handleSubmit(e) {
        e.preventDefault();
        
        // Clear previous errors
        setLocalError("");
        
        // Validation
        if (!modelName.trim()) {
            setLocalError("Model name is required");
            return;
        }
        if (!apiKey.trim()) {
            setLocalError("API key is required");
            return;
        }
        if (apiKey.length < 10) {
            setLocalError("API key seems too short");
            return;
        }

        setIsSubmitting(true);
        dispatch(AddModel({ userId, modelName, apiKey }))
            .unwrap()
            .then(() => {
                // Success - clear form
                setModelName("");
                setApiKey("");
                setIsSubmitting(false);
            })
            .catch((error) => {
                console.error("Failed to add model:", error);
                setIsSubmitting(false);
            });
    }

    // Get error message to display
    const getErrorMessage = () => {
        if (localError) return localError;
        if (error) {
            if (typeof error === 'string') return error;
            if (error.message) return error.message;
            if (error.error) return error.error;
            return "Failed to save settings. Please try again.";
        }
        return "";
    };

    const isLoading = status === 'loading' || isSubmitting;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <AppHeader />
            
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">
                            Settings
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Configure your AI model settings and API keys
                        </p>
                    </div>

                    {/* Settings Form */}
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        {/* OpenRouter Guide */}
                        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <div className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 8a1 1 0 112 0v4a1 1 0 01-2 0V8zm1 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/></svg>
                                <div className="text-sm text-yellow-900">
                                    <p className="font-semibold mb-1">Using OpenRouter</p>
                                    <ol className="list-decimal ml-5 space-y-1">
                                        <li>Get an API key from <a className="text-blue-600 underline" target="_blank" rel="noreferrer" href="https://openrouter.ai/keys">openrouter.ai/keys</a>.</li>
                                        <li>Find a model name from <a className="text-blue-600 underline" target="_blank" rel="noreferrer" href="https://openrouter.ai/models">openrouter.ai/models</a> (e.g., <code className="px-1 py-0.5 bg-gray-100 rounded">openrouter/auto</code>).</li>
                                        <li>Paste the model name and API key below, then Save.</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                </svg>
                                AI Model Configuration
                            </h2>
                            <p className="text-gray-600 text-sm">
                                Add your AI model details and API key to enable chat functionality
                            </p>
                        </div>

                        {/* Error Message */}
                        {(localError || error) && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-red-700 font-medium">
                                        {getErrorMessage()}
                                    </span>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Model Name Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Model Name
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="e.g., GPT-4, Claude-3, Gemini"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                                        value={modelName}
                                        onChange={(e) => setModelName(e.target.value)}
                                        disabled={isLoading}
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="mt-1 text-xs text-gray-500">
                                    Enter a model from OpenRouter (e.g., <span className="font-medium">openrouter/auto</span>). See <a className="text-blue-600 underline" target="_blank" rel="noreferrer" href="https://openrouter.ai/models">model list</a>.
                                </p>
                            </div>

                            {/* API Key Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    API Key
                                </label>
                                <div className="relative">
                                    <input
                                        type={showApiKey ? "text" : "password"}
                                        placeholder="Enter your API key"
                                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                                        value={apiKey}
                                        onChange={(e) => setApiKey(e.target.value)}
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowApiKey(!showApiKey)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                        disabled={isLoading}
                                    >
                                        {showApiKey ? (
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                <p className="mt-1 text-xs text-gray-500">
                                    Paste your OpenRouter API key. Get one at <a className="text-blue-600 underline" target="_blank" rel="noreferrer" href="https://openrouter.ai/keys">openrouter.ai/keys</a>.
                                </p>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 transform ${
                                    isLoading
                                        ? 'bg-gray-300 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:scale-[1.02]'
                                }`}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                        Saving Settings...
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center">
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Save Settings
                                    </div>
                                )}
                            </button>
                        </form>

                        {/* Info Section */}
                        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="flex items-start">
                                <svg className="w-5 h-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                <div>
                                    <h3 className="text-sm font-medium text-blue-800 mb-1">
                                        Security Note
                                    </h3>
                                    <p className="text-sm text-blue-700">
                                        Your API key is encrypted and stored securely. We never display or share your API key with third parties.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Setting;
import {  useState } from "react";
import { login } from '../redux/userSlice'
import {useDispatch} from "react-redux"
import {LoginRequest} from  "../axios/userRequstes";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
    const status = useSelector((state) => state.user.status);
    const error = useSelector((state) => state.user.error);
    const userId = useSelector((state) => state.user.user.id);
    const [email,setEmail]=useState("");
    const [password, setPassword] = useState("");
    const [localError, setLocalError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleLogin=(e)=>{
        e.preventDefault();
        
        // Clear previous errors
        setLocalError("");
        
        // Basic validation
        if (!email.trim()) {
            setLocalError("Email is required");
            return;
        }
        // Email format validation
        const emailValid = /[^@\s]+@[^@\s]+\.[^@\s]+/.test(email);
        if (!emailValid) {
            setLocalError("Please enter a valid email address");
            return;
        }
        if (!password.trim()) {
            setLocalError("Password is required");
            return;
        }
        
        dispatch(login({ email, password }));
        dispatch(LoginRequest({email,password}));
    }
    
    useEffect(() => {
        if (status === 'success' && userId) {
            navigate('/dashboard'); 
        }
    }, [status, navigate, userId]);

    // Clear error when user starts typing
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (localError || error) {
            setLocalError("");
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (localError || error) {
            setLocalError("");
        }
    };

    // Get error message to display
    const getErrorMessage = () => {
        if (localError) return localError;
        if (error) {
            // Handle different types of error messages from the server
            if (typeof error === 'string') return error;
            if (error.message) return error.message;
            if (error.error) return error.error;
            return "Login failed. Please check your credentials.";
        }
        return "";
    };

    const isLoading = status === 'loading';
    
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 flex items-center">
            <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Marketing/Intro Panel */}
                <div className="hidden lg:flex">
                    <div className="relative w-full rounded-2xl overflow-hidden shadow-xl border border-blue-100 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">
                        <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(circle at 20% 20%, #fff 0%, transparent 25%), radial-gradient(circle at 80% 30%, #fff 0%, transparent 25%), radial-gradient(circle at 30% 80%, #fff 0%, transparent 25%)'}}></div>
                        <div className="relative p-8 text-white h-full flex flex-col">
                            <div className="flex items-center mb-6">
                                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mr-3">
                                    <svg className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10.5A1.5 1.5 0 003.5 17H14a2 2 0 002-2V6.414A2 2 0 0015.414 5L12 1.586A2 2 0 0010.586 1H4zm2 7a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"/></svg>
                                </div>
                                <h1 className="text-2xl font-bold">Chat with your PDFs</h1>
                            </div>
                            <p className="text-blue-50/90 leading-relaxed mb-6">
                                Upload documents and ask questions in natural language. We extract, index, and let you converse with your content instantly.
                            </p>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-start gap-3">
                                    <span className="mt-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/20">
                                        <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                                    </span>
                                    <div>
                                        <p className="font-semibold">Fast answers</p>
                                        <p className="text-blue-50/80">Ask anything about your document; get concise, cited responses.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="mt-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/20">
                                        <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.5 3.5a1 1 0 011 1V9h4.5a1 1 0 110 2H11.5v4.5a1 1 0 11-2 0V11H5a1 1 0 110-2h4.5V4.5a1 1 0 011-1z" clipRule="evenodd"/></svg>
                                    </span>
                                    <div>
                                        <p className="font-semibold">Multiple PDFs</p>
                                        <p className="text-blue-50/80">Upload and manage a personal library of documents.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="mt-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/20">
                                        <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M2.25 10c0-4.28 3.47-7.75 7.75-7.75S17.75 5.72 17.75 10 14.28 17.75 10 17.75 2.25 14.28 2.25 10zm10.22-2.28a.75.75 0 10-1.06-1.06L9 9.06 8.09 8.15a.75.75 0 10-1.06 1.06l1.5 1.5a.75.75 0 001.06 0l2.88-2.99z" clipRule="evenodd"/></svg>
                                    </span>
                                    <div>
                                        <p className="font-semibold">OpenRouter compatible</p>
                                        <p className="text-blue-50/80">Bring your own API key and model for full control.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-auto pt-8">
                                <div className="bg-white/10 border border-white/20 rounded-xl p-4">
                                    <p className="text-sm text-blue-50">
                                        New here? Add your model name and API key in Settings after logging in. We guide you through OpenRouter setup.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Auth Card */}
                <div className="bg-white p-8 rounded-2xl shadow-xl w-full border border-gray-100">
                <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">Welcome back</h2>
                <p className="text-center text-gray-600 mb-6">Sign in to continue</p>

                {/* Error Message */}
                {(localError || error) && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                        {getErrorMessage()}
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleLogin}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            required
                            onChange={handleEmailChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                            disabled={isLoading}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                required
                                onChange={handlePasswordChange}
                                className="w-full px-4 py-2 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 px-3 text-gray-400 hover:text-gray-600"
                                disabled={isLoading}
                                aria-label="Toggle password visibility"
                            >
                                {showPassword ? (
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/></svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd"/><path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"/></svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-2 rounded-lg transition ${
                            isLoading 
                                ? 'bg-gray-300 cursor-not-allowed' 
                                : 'bg-blue-500 hover:bg-blue-600'
                        } text-white`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Logging in...
                            </div>
                        ) : (
                            'Login'
                        )}
                    </button>
                </form>
                
                  <div className="text-center mt-4">
                      <span>Don't have an account? </span>
                      <Link to="/signup" className="text-blue-600 hover:underline">
                          Sign up
                      </Link>
                  </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
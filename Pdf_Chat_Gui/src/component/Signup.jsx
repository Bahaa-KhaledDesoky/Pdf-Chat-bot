import { useState, useEffect } from "react";
import { SignUpRequest } from '../axios/userRequstes';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAuthState } from '../redux/userSlice';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [localError, setLocalError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const status = useSelector((state) => state.user.status);
    const error = useSelector((state) => state.user.error);
    const userId = useSelector((state) => state.user.user.id);

    const isLoading = status === 'loading';

    // Navigate to login page after successful signup
    useEffect(() => {
        if (status === 'success' && userId) {
            // Show success message briefly then clear state and navigate to login
            setTimeout(() => {
                dispatch(clearAuthState());
                navigate('/login');
            }, 1500);
        }
    }, [status, userId, navigate, dispatch]);

    function validateEmail(value) {
        return /[^@\s]+@[^@\s]+\.[^@\s]+/.test(value);
    }

    const handleSignup = (e) => {
        e.preventDefault();
        setLocalError("");

        if (!email.trim() || !username.trim() || !password.trim() || !confirmPassword.trim()) {
            setLocalError("All fields are required");
            return;
        }
        if (!validateEmail(email)) {
            setLocalError("Please enter a valid email address");
            return;
        }
        if (password.length < 8) {
            setLocalError("Password must be at least 8 characters");
            return;
        }
        if (password !== confirmPassword) {
            setLocalError("Passwords do not match");
            return;
        }

        dispatch(SignUpRequest({ email, username, password }));
    };

    const serverError = (() => {
        if (!error) return "";
        if (typeof error === 'string') return error;
        if (error.message) return error.message;
        if (error.error) return error.error;
        return "Signup failed. Please try again.";
    })();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
                <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">Create account</h2>
                <p className="text-center text-gray-600 mb-6">Join us to chat with your PDFs</p>

                {(localError || error) && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                        {localError || serverError}
                    </div>
                )}
                
                {status === 'success' && userId && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
                        Account created successfully! Redirecting to login...
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleSignup}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            User name
                        </label>
                        <input
                            type="text"
                            placeholder="Your name"
                            value={username}
                            required
                            onChange={(e) => setUsername(e.target.value)}
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
                                placeholder="At least 8 characters"
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
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
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirm ? "text" : "password"}
                                placeholder="Re-enter your password"
                                value={confirmPassword}
                                required
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-2 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute inset-y-0 right-0 px-3 text-gray-400 hover:text-gray-600"
                                disabled={isLoading}
                                aria-label="Toggle confirm password visibility"
                            >
                                {showConfirm ? (
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/></svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd"/><path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"/></svg>
                                )}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-2 rounded-lg transition ${isLoading ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Creating account...
                            </div>
                        ) : (
                            'Sign Up'
                        )}
                    </button>
                </form>
                <div className="text-center mt-4">
                    <span>Already have an account? </span>
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
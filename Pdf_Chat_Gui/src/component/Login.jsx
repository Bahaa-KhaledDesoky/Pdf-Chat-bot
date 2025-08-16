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
    const [email,setEmail]=useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch =useDispatch();
    
    const handleLogin=(e)=>{
        e.preventDefault();
        dispatch(login({ email, password }));

        dispatch(LoginRequest({email,password}));
    }
    
    useEffect(() => {
        if (status === 'success') {
            navigate('/dashboard'); 
        }
    }, [status, navigate]);
      return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            required
                            onChange={(e=>{setEmail(e.target.value)})}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            required
                            onChange={(e)=>setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                </form>
                  <div className="text-center mt-4">
                      <span>Don't have an account? </span>
                      <Link to="/signup" className="text-blue-500 hover:underline">
                          Sign up
                      </Link>
                  </div>
            </div>
        </div>
    );
}
export default Login;
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../redux/userSlice";
import { useNavigate, useLocation } from "react-router";
import { resetChat } from "../redux/chatSlice";
import { resetPdf } from "../redux/pdfSclice";
import { useState } from "react";

const AppHeader = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const user = useSelector((state) => state.user?.user);

    function handleSignOut() {
        dispatch(resetChat());
        dispatch(resetPdf());
        dispatch(signOut());
        navigate('/login');
    }

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z' },
        { name: 'Settings', path: '/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }
    ];

    return (
        <div className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
            <header className="relative">
                <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Mobile menu button */}
                        <button
                            type="button"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="relative rounded-md p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 lg:hidden transition-colors duration-200"
                        >
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Open menu</span>
                            <svg 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="1.5" 
                                className="size-6"
                            >
                                <path 
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                />
                            </svg>
                        </button>

                        {/* Logo */}
                        <div className="flex lg:ml-0">
                            <div 
                                onClick={() => navigate('/dashboard')}
                                className="flex items-center cursor-pointer group"
                            >
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    PDF Chat
                                </span>
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex lg:items-center lg:space-x-8">
                            {navItems.map((item) => (
                                <div key={item.path}>
                                    <button
                                        onClick={() => navigate(item.path)}
                                        className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                            isActive(item.path)
                                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                                        }`}
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d={item.icon} clipRule="evenodd" />
                                        </svg>
                                        {item.name}
                                    </button>
                                </div>
                            ))}
                            
                            {/* User Menu */}
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-3 px-3 py-2 bg-gray-50 rounded-lg">
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                        <span className="text-sm font-medium text-white">
                                            {user?.email?.charAt(0).toUpperCase() || 'U'}
                                        </span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 hidden sm:block">
                                        {user?.email || 'User'}
                                    </span>
                                </div>
                                
                                <button
                                    onClick={handleSignOut}
                                    className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                                    </svg>
                                    Sign out
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Mobile menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden">
                        <div className="fixed inset-0 z-50">
                            <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setIsMobileMenuOpen(false)}></div>
                            
                            <div className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out">
                                <div className="flex px-4 pt-5 pb-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                                    >
                                        <span className="absolute -inset-0.5"></span>
                                        <span className="sr-only">Close menu</span>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6">
                                            <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Mobile Navigation Links */}
                                <div className="space-y-1 px-4 py-6">
                                    {navItems.map((item) => (
                                        <button
                                            key={item.path}
                                            onClick={() => {
                                                navigate(item.path);
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className={`flex w-full items-center px-3 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                                                isActive(item.path)
                                                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                                            }`}
                                        >
                                            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d={item.icon} clipRule="evenodd" />
                                            </svg>
                                            {item.name}
                                        </button>
                                    ))}
                                </div>

                                {/* Mobile User Section */}
                                <div className="border-t border-gray-200 px-4 py-6">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                            <span className="text-sm font-medium text-white">
                                                {user?.email?.charAt(0).toUpperCase() || 'U'}
                                            </span>
                                    </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-700">
                                                {user?.email || 'User'}
                                            </p>
                                            <p className="text-xs text-gray-500">Signed in</p>
                                </div>
                                    </div>
                                    
                                    <button
                                        onClick={handleSignOut}
                                        className="flex w-full items-center px-3 py-3 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                                    >
                                        <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                                    </svg>
                                        Sign out
                                </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                </header>
        </div>
    );
};

export default AppHeader;

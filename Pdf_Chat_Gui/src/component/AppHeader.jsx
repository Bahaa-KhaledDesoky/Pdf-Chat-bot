import { useDispatch } from "react-redux";
import { signOut } from "../redux/userSlice";
import { useNavigate } from "react-router";
import { resetChat } from "../redux/chatSlice";
import { resetPdf } from "../redux/pdfSclice";

const AppHeader = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function handelSignOut() {

        dispatch(resetChat());
        dispatch(resetPdf());
        dispatch(signOut());
        navigate('/login');
    }
    return (
        <div>
            <div className="bg-white">
                {/** Mobile menu */}
                <el-dialog>
                    <dialog id="mobile-menu" className="backdrop:bg-transparent lg:hidden">
                        <div tabindex="0" className="fixed inset-0 flex focus:outline-none">
                            <el-dialog-panel className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full">
                                <div className="flex px-4 pt-5 pb-2">
                                    <button type="button" command="close" commandfor="mobile-menu" className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400">
                                        <span className="absolute -inset-0.5"></span>
                                        <span className="sr-only">Close menu</span>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" className="size-6">
                                            <path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </button>
                                </div>

                                {/** Links */}

                                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                    <div className="flow-root">
                                        <a href="/dashboard" className="-m-2 block p-2 font-medium text-gray-900">Dashboard</a>
                                    </div>
                                </div>
                                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                    <div className="flow-root">
                                        <a href="/settings" className="-m-2 block p-2 font-medium text-gray-900">Setting</a>
                                    </div>
                                </div>

                                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                    <div className="flow-root">
                                        <a href="#" onClick={handelSignOut} className="-m-2 block p-2 font-medium text-gray-900">Sign out</a>
                                    </div>
                                </div>
                            </el-dialog-panel>
                        </div>
                    </dialog>
                </el-dialog>

                <header className="relative bg-white">

                    <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="border-b border-gray-200">
                            <div className="flex h-16 items-center">
                                <button type="button" command="show-modal" commandfor="mobile-menu" className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden">
                                    <span className="absolute -inset-0.5"></span>
                                    <span className="sr-only">Open menu</span>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" className="size-6">
                                        <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </button>

                                {/** Logo */}
                                <div className="ml-4 flex lg:ml-0">
                                    <a href="#">
                                        <span className="sr-only">Your Company</span>
                                        <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="" className="h-8 w-auto" />
                                    </a>
                                </div>


                                <div className="ml-auto flex items-center">
                                    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                        <a href="/dashboard" className="text-sm font-medium text-gray-700 hover:text-gray-800">Dashboard</a>
                                        <span aria-hidden="true" className="h-6 w-px bg-gray-200"></span>

                                        <a href="/settings" className="text-sm font-medium text-gray-700 hover:text-gray-800">Setting</a>
                                        <span aria-hidden="true" className="h-6 w-px bg-gray-200"></span>
                                        <a href="/login" onClick={handelSignOut} className="text-sm font-medium text-gray-700 hover:text-gray-800">Sign out</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
            </div>
        </div>


    );
};

export default AppHeader;

import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { LogOut, Menu, User, X } from "lucide-react";
import SidebarComponent from "./Sidebar";
import { assets } from "../../assets/assets";

const MenuBar = ({ activeMenu }) => {
    const [openSideBar, setOpenSideBar] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const { user, clearUser } = useContext(AppContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        clearUser();
        setShowDropdown(false);
        navigate("/login");
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        if (showDropdown) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showDropdown]);

    return (
        <div className="flex items-center justify-between gap-5 bg-white border-b border-gray-200 py-4 px-4 sm:px-7 sticky top-0 z-30">
            <div className="flex items-center gap-5">
                <button
                    onClick={() => setOpenSideBar(!openSideBar)}
                    className="block lg:hidden text-black hover:bg-gray-100 p-1 rounded transition-colors"
                >
                    {openSideBar ? <X size={24} /> : <Menu size={24} />}
                </button>
                <div className="flex items-center gap-2">
                    <img src={assets.logo} alt="Logo" className="h-10 w-10" />
                    <span
                        onClick={() => navigate("/dashboard")}
                        className="text-lg font-medium text-black truncate cursor-pointer hover:text-violet-600 transition-colors duration-200"
                    >
                        Money Manager
                    </span>
                </div>
            </div>

            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2"
                >
                    <User className="text-violet-500" />
                </button>

                {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                        <div className="px-4 py-3 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                                    <User className="w-4 h-4 text-violet-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-800 truncate">{user?.fullName}</p>
                                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                                </div>
                            </div>
                        </div>
                        <div className="py-1">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                            >
                                <LogOut size={16} className="text-gray-500" />
                                <span>Log Out</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {openSideBar && (
                <>
                    <div
                        className="fixed inset-0 bg-black/40 lg:hidden z-20 top-[73px]"
                        onClick={() => setOpenSideBar(false)}
                    />
                    <div className="fixed left-0 top-[73px] bottom-0 bg-white border-r border-gray-200 lg:hidden z-30">
                        <SidebarComponent activeMenu={activeMenu} onNavigate={() => setOpenSideBar(false)} />
                    </div>
                </>
            )}
        </div>
    );
};

export default MenuBar;

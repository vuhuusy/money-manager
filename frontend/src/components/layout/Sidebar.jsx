import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { User } from "lucide-react";
import { SIDE_BAR_DATA } from "../../constants/navigation";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ activeMenu, onNavigate }) => {
    const { user } = useContext(AppContext);
    const navigate = useNavigate();

    return (
        <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200 p-5 sticky top-[61px] z-20">
            <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
                {user?.profileImageUrl ? (
                    <img src={user.profileImageUrl} alt="Profile" className="w-20 h-20 bg-slate-400 rounded-full" />
                ) : (
                    <User className="w-20 h-20 text-xl" />
                )}
                <h5 className="text-gray-950 font-medium leading-6">{user?.fullName?.toUpperCase()}</h5>
            </div>
            {SIDE_BAR_DATA.map((item, index) => (
                <button
                    onClick={() => {
                        if (activeMenu !== item.label) navigate(item.path);
                        if (onNavigate) onNavigate();
                    }}
                    key={`menu_${index}`}
                    className={`cursor-pointer w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 transition-colors duration-200 ${activeMenu === item.label
                            ? "text-white bg-violet-600"
                            : "hover:bg-violet-50 hover:text-violet-600"
                        }`}
                >
                    <item.icon className="text-xl" />
                    {item.label}
                </button>
            ))}
        </div>
    );
};

export default Sidebar;

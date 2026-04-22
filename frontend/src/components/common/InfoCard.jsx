import { memo } from "react";

const InfoCard = ({ icon, label, value, bgColor }) => {
    return (
        <div className="flex items-center gap-5 bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
            <div className={`w-14 h-14 flex items-center justify-center text-white rounded-full shrink-0 ${bgColor}`}>
                {icon}
            </div>
            <div className="min-w-0 flex-1">
                <h6 className="text-sm text-gray-500 mb-1 truncate">{label}</h6>
                <span className="text-lg font-semibold text-gray-800 break-all">{value}</span>
            </div>
        </div>
    );
};

export default memo(InfoCard);

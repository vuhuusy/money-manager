import { Trash, Upload, User } from "lucide-react";
import { useRef, useState } from "react";

const ProfileImageSelector = ({ image, setImage }) => {
    const inputRef = useRef(null);
    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const preview = URL.createObjectURL(file);
            setPreview(preview);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreview(null);
        if (inputRef.current) inputRef.current.value = "";
    };

    const onChooseImage = () => inputRef.current.click();

    return (
        <div className="flex justify-center mb-4">
            <input type="file" accept="image/*" ref={inputRef} onChange={handleImageChange} className="hidden" />
            {!image ? (
                <div
                    onClick={onChooseImage}
                    className="w-24 h-24 flex items-center justify-center rounded-full bg-violet-50 border-2 border-dashed border-violet-300 relative cursor-pointer hover:bg-violet-100 hover:border-violet-400 transition-all duration-200 group"
                >
                    <User className="text-violet-400 group-hover:text-violet-500 transition-colors duration-200" size={40} />
                    <div className="w-7 h-7 flex items-center justify-center bg-violet-600 rounded-full absolute -bottom-1 -right-1 shadow-md">
                        <Upload size={14} className="text-white" />
                    </div>
                </div>
            ) : (
                <div className="relative group">
                    <img src={preview} alt="Profile" className="w-24 h-24 rounded-full object-cover ring-2 ring-violet-300 shadow-md" />
                    <div className="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200" />
                    <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="w-7 h-7 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full absolute -bottom-1 -right-1 shadow-md transition-colors duration-200"
                    >
                        <Trash size={13} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileImageSelector;

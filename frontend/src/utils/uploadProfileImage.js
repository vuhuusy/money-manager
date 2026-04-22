import { API_ENDPOINTS } from "./apiEndpoints";

const CLOUDINARY_UPLOAD_PRESET = "moneymanager";

const uploadProfileImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
        const response = await fetch(API_ENDPOINTS.UPLOAD_IMAGE, {
            method: "POST",
            body: formData
        });
        if (!response.ok) {
            await response.json().then(data => {
                throw new Error(data.error?.message || "Failed to upload image");
            });
        }

        const data = await response.json();
        return data.secure_url; // Return the URL of the uploaded image
    } catch (error) {
        console.error("Error uploading profile image:", error);
        throw error;
    }
}

export default uploadProfileImage;
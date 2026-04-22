import { useState } from "react";
import Button from "./Button";

const DeleteAlert = ({ content, onDelete }) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            await onDelete();
        } catch (error) {
            console.error("Error deleting item:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <p className="text-md">{content}</p>
            <div className="flex justify-end mt-6">
                <Button onClick={handleDelete} loading={loading}>
                    {loading ? "Deleting..." : "Delete"}
                </Button>
            </div>
        </div>
    );
};

export default DeleteAlert;

import { useEffect, useState } from "react";
import Input from "../common/Input";
import EmojiPickerPopup from "../common/EmojiPickerPopup";
import Button from "../common/Button";

const AddCategoryForm = ({ onAddCategory, isEditing, initialCategoryData }) => {
    const [category, setCategory] = useState({ name: "", type: "income", icon: "" });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const categoryTypeOptions = [
        { value: "income", label: "Income" },
        { value: "expense", label: "Expense" },
    ];

    useEffect(() => {
        if (isEditing && initialCategoryData) {
            setCategory(initialCategoryData);
        } else {
            setCategory({ name: "", type: "income", icon: "" });
        }
    }, [isEditing, initialCategoryData]);

    const handleInputChange = (key, value) => {
        setCategory((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async () => {
        if (loading) return;
        const newErrors = {
            name: !category.name.trim() ? "Category name is required." : null,
        };
        setErrors(newErrors);
        if (Object.values(newErrors).some(Boolean)) return;

        try {
            setLoading(true);
            await onAddCategory(category);
        } catch (error) {
            console.error("Error saving category:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <EmojiPickerPopup icon={category.icon} onSelect={(icon) => handleInputChange("icon", icon)} />
            <Input value={category.name} onChange={({ target }) => handleInputChange("name", target.value)} label="Category Name" placeholder="e.g. Salary, Food, etc." type="text" name="name" autoComplete="off" error={errors.name} />
            <Input value={category.type} onChange={({ target }) => handleInputChange("type", target.value)} label="Category Type" isSelect options={categoryTypeOptions} name="type" />
            <div className="flex justify-end mt-6">
                <Button onClick={handleSubmit} loading={loading}>
                    {loading
                        ? isEditing ? "Updating..." : "Adding..."
                        : isEditing ? "Update Category" : "Add Category"}
                </Button>
            </div>
        </div>
    );
};

export default AddCategoryForm;

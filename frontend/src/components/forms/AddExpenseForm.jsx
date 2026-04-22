import { useEffect, useState } from "react";
import EmojiPickerPopup from "../common/EmojiPickerPopup";
import Input from "../common/Input";
import Button from "../common/Button";

const AddExpenseForm = ({ onAddExpense, categories }) => {
    const [expense, setExpense] = useState({ name: "", amount: "", date: "", icon: "", categoryId: "" });
    const [loading, setLoading] = useState(false);
    const [displayAmount, setDisplayAmount] = useState("");
    const [errors, setErrors] = useState({});

    const categoryOptions = categories.map((category) => ({
        value: category.id,
        label: category.name,
    }));

    const handleChange = (field, value) => {
        setExpense((prev) => ({ ...prev, [field]: value }));
    };

    const handleAmountChange = ({ target }) => {
        const raw = target.value.replace(/[^0-9]/g, "");
        const formatted = raw ? Number(raw).toLocaleString("vi-VN") : "";
        setDisplayAmount(formatted);
        handleChange("amount", raw);
    };

    const handleAddExpense = async () => {
        if (loading) return;
        const currentDate = new Date().toISOString().split("T")[0];
        const newErrors = {
            name: !expense.name.trim() ? "Please enter an expense name." : null,
            amount:
                !expense.amount || isNaN(expense.amount) || Number(expense.amount) <= 0
                    ? "Amount must be a valid number greater than 0."
                    : null,
            date: !expense.date
                ? "Please select a date."
                : expense.date > currentDate
                    ? "Date cannot be in the future."
                    : null,
        };
        setErrors(newErrors);
        if (Object.values(newErrors).some(Boolean)) return;

        setLoading(true);
        try {
            await onAddExpense(expense);
        } catch (error) {
            console.error("Error adding expense:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (categories.length > 0 && !expense.categoryId) {
            setExpense((prev) => ({ ...prev, categoryId: categories[0].id }));
        }
    }, [categories, expense.categoryId]);

    return (
        <div>
            <EmojiPickerPopup icon={expense.icon} onSelect={(selectedIcon) => handleChange("icon", selectedIcon)} />
            <Input value={expense.name} onChange={({ target }) => handleChange("name", target.value)} label="Expense Name" placeholder="e.g., Groceries, Rent, etc." type="text" name="name" autoComplete="off" error={errors.name} />
            <Input value={expense.categoryId} onChange={({ target }) => handleChange("categoryId", target.value)} label="Category" isSelect options={categoryOptions} name="categoryId" />
            <Input value={displayAmount} onChange={handleAmountChange} label="Amount" placeholder="e.g., 500.000" type="text" name="amount" autoComplete="off" error={errors.amount} />
            <Input value={expense.date} onChange={({ target }) => handleChange("date", target.value)} label="Date" type="date" name="date" autoComplete="off" error={errors.date} />
            <div className="flex justify-end mt-6">
                <Button onClick={handleAddExpense} loading={loading}>
                    {loading ? "Adding..." : "Add Expense"}
                </Button>
            </div>
        </div>
    );
};

export default AddExpenseForm;

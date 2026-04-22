import { useEffect, useState } from "react";
import EmojiPickerPopup from "../common/EmojiPickerPopup";
import Input from "../common/Input";
import Button from "../common/Button";

const AddIncomeForm = ({ onAddIncome, categories }) => {
    const [income, setIncome] = useState({ name: "", amount: "", date: "", icon: "", categoryId: "" });
    const [loading, setLoading] = useState(false);
    const [displayAmount, setDisplayAmount] = useState("");
    const [errors, setErrors] = useState({});

    const categoryOptions = categories.map((category) => ({
        value: category.id,
        label: category.name,
    }));

    const handleChange = (field, value) => {
        setIncome((prev) => ({ ...prev, [field]: value }));
    };

    const handleAmountChange = ({ target }) => {
        const raw = target.value.replace(/[^0-9]/g, "");
        const formatted = raw ? Number(raw).toLocaleString("vi-VN") : "";
        setDisplayAmount(formatted);
        handleChange("amount", raw);
    };

    const handleAddIncome = async () => {
        if (loading) return;
        const currentDate = new Date().toISOString().split("T")[0];
        const newErrors = {
            name: !income.name.trim() ? "Please enter an income source." : null,
            amount:
                !income.amount || isNaN(income.amount) || Number(income.amount) <= 0
                    ? "Amount must be a valid number greater than 0."
                    : null,
            date: !income.date
                ? "Please select a date."
                : income.date > currentDate
                    ? "Date cannot be in the future."
                    : null,
        };
        setErrors(newErrors);
        if (Object.values(newErrors).some(Boolean)) return;

        setLoading(true);
        try {
            await onAddIncome(income);
        } catch (error) {
            console.error("Error adding income:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (categories.length > 0 && !income.categoryId) {
            setIncome((prev) => ({ ...prev, categoryId: categories[0].id }));
        }
    }, [categories, income.categoryId]);

    return (
        <div>
            <EmojiPickerPopup icon={income.icon} onSelect={(selectedIcon) => handleChange("icon", selectedIcon)} />
            <Input value={income.name} onChange={({ target }) => handleChange("name", target.value)} label="Income Source" placeholder="e.g., Salary, Freelancing, etc." type="text" name="name" autoComplete="off" error={errors.name} />
            <Input value={income.categoryId} onChange={({ target }) => handleChange("categoryId", target.value)} label="Category" isSelect options={categoryOptions} name="categoryId" />
            <Input value={displayAmount} onChange={handleAmountChange} label="Amount" placeholder="e.g., 500.000" type="text" name="amount" autoComplete="off" error={errors.amount} />
            <Input value={income.date} onChange={({ target }) => handleChange("date", target.value)} label="Date" type="date" name="date" autoComplete="off" error={errors.date} />
            <div className="flex justify-end mt-6">
                <Button onClick={handleAddIncome} loading={loading}>
                    {loading ? "Adding..." : "Add Income"}
                </Button>
            </div>
        </div>
    );
};

export default AddIncomeForm;

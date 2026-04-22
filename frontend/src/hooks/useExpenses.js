import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    addExpense as addExpenseService,
    deleteExpense as deleteExpenseService,
    downloadExpenses as downloadExpensesService,
    emailExpenses as emailExpensesService,
    getExpenses,
} from "../services/expenseService";

export const useExpenses = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const refetch = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await getExpenses();
            setData(result);
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                "Failed to fetch expense details. Please try again.";
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }, []);

    const addExpense = useCallback(
        async (expense) => {
            await addExpenseService(expense);
            toast.success("Expense added successfully.");
            await refetch();
        },
        [refetch]
    );

    const deleteExpense = useCallback(
        async (id) => {
            await deleteExpenseService(id);
            toast.success("Expense deleted successfully.");
            await refetch();
        },
        [refetch]
    );

    const downloadExpenses = useCallback(async () => {
        await downloadExpensesService();
        toast.success("Expense details downloaded successfully.");
    }, []);

    const emailExpenses = useCallback(async () => {
        await emailExpensesService();
        toast.success("Expense report sent to your email.");
    }, []);

    useEffect(() => {
        refetch();
    }, [refetch]);

    return {
        data,
        loading,
        error,
        refetch,
        addExpense,
        deleteExpense,
        downloadExpenses,
        emailExpenses,
    };
};

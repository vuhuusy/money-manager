import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    addIncome as addIncomeService,
    deleteIncome as deleteIncomeService,
    downloadIncomes as downloadIncomesService,
    emailIncomes as emailIncomesService,
    getIncomes,
} from "../services/incomeService";

export const useIncome = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const refetch = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await getIncomes();
            setData(result);
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                "Failed to fetch income details. Please try again.";
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }, []);

    const addIncome = useCallback(
        async (income) => {
            await addIncomeService(income);
            toast.success("Income added successfully.");
            await refetch();
        },
        [refetch]
    );

    const deleteIncome = useCallback(
        async (id) => {
            await deleteIncomeService(id);
            toast.success("Income deleted successfully.");
            await refetch();
        },
        [refetch]
    );

    const downloadIncomes = useCallback(async () => {
        await downloadIncomesService();
        toast.success("Income details downloaded successfully.");
    }, []);

    const emailIncomes = useCallback(async () => {
        await emailIncomesService();
        toast.success("Income report sent to your email.");
    }, []);

    useEffect(() => {
        refetch();
    }, [refetch]);

    return {
        data,
        loading,
        error,
        refetch,
        addIncome,
        deleteIncome,
        downloadIncomes,
        emailIncomes,
    };
};

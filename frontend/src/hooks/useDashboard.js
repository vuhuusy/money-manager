import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getDashboardData } from "../services/dashboardService";

export const useDashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const refetch = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await getDashboardData();
            setData(result);
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                "Failed to fetch dashboard data. Please try again.";
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        refetch();
    }, [refetch]);

    return { data, loading, error, refetch };
};

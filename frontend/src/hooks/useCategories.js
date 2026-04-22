import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    addCategory as addCategoryService,
    getAllCategories,
    getCategoriesByType,
    updateCategory as updateCategoryService,
} from "../services/categoryService";

/**
 * @param {string} [type] - Optional: "income" | "expense". Omit to fetch all categories.
 */
export const useCategories = (type) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const refetch = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = type
                ? await getCategoriesByType(type)
                : await getAllCategories();
            setData(result);
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                "Failed to fetch categories. Please try again.";
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }, [type]);

    const addCategory = useCallback(
        async (category) => {
            await addCategoryService(category);
            toast.success("Category added successfully!");
            await refetch();
        },
        [refetch]
    );

    const updateCategory = useCallback(
        async ({ id, name, type: catType, icon }) => {
            await updateCategoryService(id, { name, type: catType, icon });
            toast.success("Category updated successfully!");
            await refetch();
        },
        [refetch]
    );

    useEffect(() => {
        refetch();
    }, [refetch]);

    return { data, loading, error, refetch, addCategory, updateCategory };
};

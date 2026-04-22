import axiosConfig from "../utils/axiosConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";

export const getExpenses = async () => {
  const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES);
  return response.data;
};

export const addExpense = async ({ name, amount, date, icon, categoryId }) => {
  const response = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
    name,
    amount: Number(amount),
    date,
    icon,
    categoryId,
  });
  return response.data;
};

export const deleteExpense = async (expenseId) => {
  await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(expenseId));
};

export const downloadExpenses = async () => {
  const response = await axiosConfig.get(API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD, {
    responseType: "blob",
  });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "expenses_details.xlsx");
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const emailExpenses = async () => {
  await axiosConfig.post(API_ENDPOINTS.EMAIL_EXPENSE);
};

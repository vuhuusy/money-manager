import axiosConfig from "../utils/axiosConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";

export const getIncomes = async () => {
  const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
  return response.data;
};

export const addIncome = async ({ name, amount, date, icon, categoryId }) => {
  const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, {
    name,
    amount: Number(amount),
    date,
    icon,
    categoryId,
  });
  return response.data;
};

export const deleteIncome = async (incomeId) => {
  await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(incomeId));
};

export const downloadIncomes = async () => {
  const response = await axiosConfig.get(API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD, {
    responseType: "blob",
  });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "incomes_details.xlsx");
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const emailIncomes = async () => {
  await axiosConfig.post(API_ENDPOINTS.EMAIL_INCOME);
};

import axiosConfig from "../utils/axiosConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";

export const applyFilter = async ({ type, startDate, endDate, sortField, sortOrder, keyword }) => {
  const response = await axiosConfig.post(API_ENDPOINTS.APPLY_FILTER, {
    type,
    startDate: startDate || null,
    endDate: endDate || null,
    sortBy: sortField,
    sortDirection: sortOrder,
    keyword,
  });
  return response.data;
};

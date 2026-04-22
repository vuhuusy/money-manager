import axiosConfig from "../utils/axiosConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";

export const getDashboardData = async () => {
  const response = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA);
  return response.data;
};

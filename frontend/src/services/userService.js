import axiosConfig from "../utils/axiosConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";

export const getUserInfo = async () => {
  const response = await axiosConfig.get(API_ENDPOINTS.GET_USER_INFO);
  return response.data;
};

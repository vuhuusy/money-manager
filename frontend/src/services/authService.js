import axiosConfig from "../utils/axiosConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";

export const login = async (email, password) => {
  const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, { email, password });
  return response.data; // { user, token }
};

export const register = async ({ fullName, email, password, profileImageUrl }) => {
  const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
    fullName,
    email,
    password,
    profileImageUrl,
  });
  return response.data;
};

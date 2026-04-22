import axiosConfig from "../utils/axiosConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";

export const getAllCategories = async () => {
  const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
  return response.data;
};

export const getCategoriesByType = async (type) => {
  const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE(type));
  return response.data;
};

export const addCategory = async (category) => {
  const response = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY, category);
  return response.data;
};

export const updateCategory = async (id, { name, type, icon }) => {
  const response = await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id), {
    name,
    type,
    icon,
  });
  return response.data;
};

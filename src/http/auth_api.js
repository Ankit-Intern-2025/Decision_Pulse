import axios from "axios";
import config from "../utils/config";
import { apiCaller, getApi } from "./dashboard_api";


export const getValidateToken = async (token) => {
  try {
    const endpoint = `/users/validate/${token}`;
    const response = await getApi(endpoint);
    return response;
  } catch (error) {
    console.error(`Error fetching filters for ${modalType}:`, error);
    throw error; // Re-throw error for the caller to handle
  }
};
export const activateAccount = async (request) => {
    try {
      const endpoint = `/users/activate`;
      const response = await apiCaller(JSON.stringify(request),{"Content-Type":"application/json"}, endpoint);
      return response;
    } catch (error) {
      console.error(`Error fetching filters for ${modalType}:`, error);
      throw error; // Re-throw error for the caller to handle
    }
  };
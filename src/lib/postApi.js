import axios from "axios";
import config from "../utils/config";

export const apiCaller = async (body, headers, endPoint) => {
  let url = config.BASE_URL + endPoint;
  try {
    const response = await axios.post(url, body, { headers });
    return response.data;
  } catch (error) {}
};
export const getApi = async (endPoint) => {
  let url = config.BASE_URL + endPoint;
  const response = await axios.get(url);
  return response.data;
};

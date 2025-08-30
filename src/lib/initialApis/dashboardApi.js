import { apiCaller, getApi } from "../postApi";

//------------------------- 1. Get Anomaly Data --------------------
export const getAnomalyData = async () => {
  const config = {};

  let response = await getApi("api/anomaly");

  return response;
};

//------------------------- 2. Get Descriptive Data --------------------
export const getDescriptiveData = async () => {
  let response = await getApi("api/descriptive");

  return response;
};

//------------------------- 3. Get diagnostic Data --------------------
export const getDiagnosticData = async () => {
  let response = await getApi("api/diagnostic");

  return response;
};

export const fetchDataForModule = async (modalType, dataType) => {
  try {
    const endpoint = `api/${modalType}/${dataType}`;
    const response = await getApi(endpoint);
    return response;
  } catch (error) {
    console.error(`Error fetching ${dataType} data for ${modalType}:`, error);
    throw error;
  }
};

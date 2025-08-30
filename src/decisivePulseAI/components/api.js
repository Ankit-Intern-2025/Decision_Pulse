import axios from "axios";
import config from "../../utils/config";
export const fetchData = async (yourFile, competitorFile) => {
  const formData = new FormData();
  formData.append("our_data", yourFile);
  formData.append("competitor_data", competitorFile);

  try {
    const response = await axios.post(`${config.BASE_URL}/upload/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      // timeout: 600000,
    });
    console.log("Backend response:", response); // Log the response
    return response.data;
  } catch (error) {
    console.error("Error uploading data:", error);
    throw error;
  }
};

import axios from "axios";
import config from "../utils/config";

export const API = axios.create({
  baseURL: config.BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
})
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    // console.log(token, "in API")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
API.interceptors.response.use(
  (response) => response, // Pass through valid responses
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized access - logging out user.");
      localStorage.removeItem("accessToken"); // Remove invalid token
      API.defaults.headers.common["Authorization"] = ""; // Clear authorization header
      window.location.href = "/"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);
// // 🚀 JWT Interceptor: Handle expired token (401 errors)
// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       console.log("Unauthorized! Redirecting to login...");
//       localStorage.removeItem("jwtToken");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );


export const apiCaller = async (body, headers, endPoint) => {
  const url = config.BASE_URL + endPoint;
  try {
    const response = await API.post(endPoint, body, {headers})//axios.post(url, body, { headers });
    return response.data; // Return the response data directly
  } catch (error) {
    console.error(`Error in API call to ${url}:`, error); // Log the error for debugging
    return error
    // throw new Error("API request failed");
  }
};
export const putCaller = async (body, headers, endPoint) => {
  const url = config.BASE_URL + endPoint;
  try {
    const response = await API.put(endPoint, body)//axios.put(url, body, { headers });
    return response.data; // Return the response data directly
  } catch (error) {
    console.error(`Error in API call to ${url}:`, error); // Log the error for debugging
    return error
    // throw new Error("API request failed");
  }
};
export const deleteCaller = async (body, headers, endPoint) => {
  const url = config.BASE_URL + endPoint;
  try {
    const response = await API.delete(url, {
      headers,
      data: body, // Move body inside the config object
    });
    return response; // Return the response directly
  } catch (error) {
    console.error(`Error in API call to ${url}:`, error); // Log the error for debugging
    return error;
  }
};

export const getApi = async (endPoint) => {
  const url = config.BASE_URL + endPoint;
  try {
    const response = await API.get(endPoint)// axios.get(url);//
    if (response.status === 200) {
      return response.data; // Return data if the request was successful
    } else {
      throw new Error(`Request failed with status code: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw new Error("Failed to fetch data");
  }
};

export const getPdf = async (endPoint, params) => {
  const url = config.BASE_URL + endPoint;
  try {
    const response = await API.get(endPoint, {params:params})// axios.get(url);//
    if (response.status === 200) {
      return response.data; // Return data if the request was successful
    } else {
      throw new Error(`Request failed with status code: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw new Error("Failed to fetch data");
  }
};

export const fetchModules = async () => {
  try {
    const endpoint = `/getAllDepartments/`;
    const response = await getApi(endpoint);
    return response;
  } catch (error) {
    console.error(`Error fetching modules`, error);
    return error // Re-throw error for the caller to handle
  }
};
export const fetchDashboards = async (module_id) => {
  
  try {
    const endpoint = `/getAllDashboards/`;
    const response = await apiCaller(JSON.stringify({ "department_id": module_id}),{"Content-Type":"application/json"}, endpoint);
    return response;
  } catch (error) {
    console.error(`Error fetching modules`, error);
    return error // Re-throw error for the caller to handle
  }
};
export const fetchDataForModule = async (version_id, dataType) => {
  try {
    const endpoint = `/api/${version_id}/${dataType}`;
    const response = await getApi(endpoint);
    return response;
  } catch (error) {
    console.error(`Error fetching ${dataType} data for ${version_id}:`, error);
    throw error; // Re-throw error for the caller to handle
  }
};
export const fetchDataForAnomaly = async (modalType, version_id, user_id) => {
  try {
    const endpoint = `/api/${modalType}/${version_id}/anomaly`;
    const response = await getApi(endpoint);
    return response;
  } catch (error) {
    console.error(`Error fetching anomaly data for ${modalType}:`, error);
    throw error; // Re-throw error for the caller to handle
  }
};
export const fetchDataForDescriptiveModule = async (modalType, filters=[],dashboard_id) => {
  try {
    const endpoint = `/dashboards/${dashboard_id}/get-all-pages`;
    const response = await getApi(endpoint);
    return response;
  } catch (error) {
    console.error(`Error fetching descriptive data for ${modalType}:`, error);
    throw error; // Re-throw error for the caller to handle
  }
};
// export const fetchDataForDescriptiveModule = async (modalType, filters=[],versionId) => {
//   try {
//     const endpoint = `/api/${modalType}/descriptive/plot-data/${modalType}/${versionId}`;
//     const response = await apiCaller(JSON.stringify(filters),{"Content-Type":"application/json"}, endpoint);
//     return response;
//   } catch (error) {
//     console.error(`Error fetching descriptive data for ${modalType}:`, error);
//     throw error; // Re-throw error for the caller to handle
//   }
// };
export const getFilters = async (modalType, versionId) => {
  try {
    const endpoint = `/api/get-filters`;
    const response = await apiCaller(JSON.stringify({database_name:modalType,versionid:versionId}),{"Content-Type":"application/json"}, endpoint);
    return response;
  } catch (error) {
    console.error(`Error fetching filters for ${modalType}:`, error);
    throw error; // Re-throw error for the caller to handle
  }
};

export const getAppliedFilters = async (modalType, filters=[], versionId, ownerId) => {
  try {
    const endpoint = `/apply-filters/${modalType}/${versionId}/${ownerId}`;
    const response = await apiCaller(JSON.stringify(filters),{"Content-Type":"application/json"}, endpoint);
    return response;
  } catch (error) {
    console.error(`Error fetching descriptive data for ${modalType}:`, error);
    throw error; // Re-throw error for the caller to handle
  }
};
export const postApplyModeling = async (edges, modalType) => {
  try {
    const endpoint = `etl/submit-connected-schema/`;
    const response = await apiCaller(JSON.stringify(edges),{"Content-Type":"application/json"}, endpoint);
    return response;
  } catch (error) {
    console.error(`Error fetching descriptive data for ${modalType}:`, error);
    throw error; // Re-throw error for the caller to handle
  }
};
export const createDashboard = async (data) => {
  try {
    const endpoint = `/create-dashboard/`;
    const response = await apiCaller(JSON.stringify(data),{"Content-Type":"application/json"}, endpoint);
    return response;
  } catch (error) {
    console.error(`Error creating dashboard`, error);
    throw error; // Re-throw error for the caller to handle
  }
};
export const fetchChatBot = async (data) => {
  try {
    const endpoint = `/chat`;
    const response = await apiCaller(JSON.stringify(data),{"Content-Type":"application/json"}, endpoint);
    return response;
  } catch (error) {
    console.error(`Error creating dashboard`, error);
    throw error; // Re-throw error for the caller to handle
  }
};

export const createPage = async (data) => {
  try {
    const endpoint = `/create-page`;
    const response = await apiCaller(JSON.stringify(data),{"Content-Type":"application/json"}, endpoint);
    return response;
  } catch (error) {
    console.error(`Error creating dashboard`, error);
    throw error; // Re-throw error for the caller to handle
  }
};
export const updatePage = async (data, pageId) => {
  try {
    const endpoint = `/update-page/${pageId}`;
    const response = await putCaller(JSON.stringify(data),{"Content-Type":"application/json"}, endpoint);
    return response;
  } catch (error) {
    console.error(`Error creating dashboard`, error);
    throw error; // Re-throw error for the caller to handle
  }
};
export const deletePage = async (dashboard_id, pageId) => {
  try {
    const endpoint = `/delete-page/${pageId}`;
    const response = await deleteCaller(JSON.stringify({dashboard_id:dashboard_id}),{"Content-Type":"application/json"}, endpoint);
    return response;
  } catch (error) {
    console.error(`Error creating dashboard`, error);
    throw error; // Re-throw error for the caller to handle
  }
};




export const getDataByXyKey = async (modalType, filters=[], versionId, ownerId) => {
  try {
    const endpoint = `/apply-filters/${modalType}/${versionId}/${ownerId}`;
    const response = await apiCaller(JSON.stringify(filters),{"Content-Type":"application/json"}, endpoint);
    return response;
  } catch (error) {
    console.error(`Error fetching descriptive data for ${modalType}:`, error);
    throw error; // Re-throw error for the caller to handle
  }
};


export const fetchIndustries = async () => {
  try {
    const endpoint = `/admin/industries`;
    const response = await getApi(endpoint);
    return response;
  } catch (error) {
    console.error(`Error fetching industries`, error);
    return error // Re-throw error for the caller to handle
  }
};
export const deleteIndustry = async (industryId) => {
  try {
    const endpoint = `/admin/delete-industry/${industryId}`;
    const response = await deleteCaller(JSON.stringify({}),{"Content-Type":"application/json"}, endpoint);
    return response;
  } catch (error) {
    console.error(`Error deleting industry`, error);
    return error // Re-throw error for the caller to handle
  }
};
export const updateIndustryName = async (industryId, newIndustry) => {
  try {
    const endpoint = `/admin/update-industry/${industryId}`;
    const response = await putCaller(JSON.stringify(newIndustry),{"Content-Type":"application/json"}, endpoint);
    return response;
  } catch (error) {
    console.error(`Error deleting industry`, error);
    return error // Re-throw error for the caller to handle
  }
};
export const addNewIndustry = async (industry) => {
  try {
    const endpoint = `/admin/add-industry`;
    const response = await apiCaller(JSON.stringify(industry),{"Content-Type":"application/json"}, endpoint);
    return response;
  } catch (error) {
    console.error(`Error fetching descriptive data for ${modalType}:`, error);
    throw error; // Re-throw error for the caller to handle
  }
};
export const fetchIndustry = async (userId) => {
  try {
    const endpoint = `/getUserDomain/${userId}`;
    const response = await getApi(endpoint);
    return response;
  } catch (error) {
    console.error(`Error fetching selected domain & industry`, error);
    return error // Re-throw error for the caller to handle
  }
};

export const updateIndustry = async (userId, data) => {
  try {
    const endpoint = `/updateUserDomain/${userId}`;
    const response = await putCaller(JSON.stringify(data),{"Content-Type":"application/json"}, endpoint);
    return response;
  } catch (error) {
    console.error(`Error creating dashboard`, error);
    throw error; // Re-throw error for the caller to handle
  }
};

//IN bookmarks
export const getSessionData = () => {
  const data = sessionStorage.getItem("selectedDashboard"); // Replace "session_key" with your key
  return data ? JSON.parse(data) : null;
};
export const fetchPagesFromAPI = async (dashboard_id) => {
  try {
    const endpoint = `/dashboards/${dashboard_id}/get-all-pages`;
    const response = await getApi(endpoint);
    // console.log(response)
    return response;
  } catch (error) {
    console.error(`Error fetching modules`, error);
    return error // Re-throw error for the caller to handle
  }
};
export const fetchBookmarksFromAPI = async (dashboard_id = "8f42ab59-59e3-40ae-805e-d336bb795812") => {
  try {
    const endpoint = `/dashboards/${dashboard_id}/get-all-bookmarks`;
    // console.log(endpoint)
    const response = await getApi(endpoint);
    // console.log(response, "In api func")
    return response;
  } catch (error) {
    console.error(`Error fetching modules`, error);
    return error // Re-throw error for the caller to handle
  } 
};
export const addBookmarksFromAPI = async (body) => {
  try {
    const endpoint = `/create-bookmark`;
    const payload = JSON.stringify(body)
    console.log(payload)
    const response = await apiCaller(payload,{"Content-Type":"application/json"}, endpoint);
    console.log(response, "API created bookmark")
    return response;
  } catch (error) {
    console.error(`Error Creating Bookmark ${body}:`, error);
    throw error; // Re-throw error for the caller to handle
  }
};
export const updateBookmarksFromAPI = async (bookmark) => {
  try {
    const endpoint = `/update-bookmark/${bookmark.id}`;
    // const pageId = {page_id: bookmark.page_id}
    const response = await putCaller(JSON.stringify(bookmark),{"Content-Type":"application/json"}, endpoint);
    console.log(response, "updated data")
    return response;
  } catch (error) {
    console.error(`Error creating dashboard`, error);
    throw error; // Re-throw error for the caller to handle
  }
}
export const renameBookmarksFromAPI = async (bookmark) => {
  try {
    const endpoint = `/update-bookmark/${bookmark.id}`;
    const payload = {page_id: bookmark.page_id, name: bookmark.name}
    const response = await putCaller(JSON.stringify(payload),{"Content-Type":"application/json"}, endpoint);
    console.log(response, "updated data")
    return response;
  } catch (error) {
    console.error(`Error creating dashboard`, error);
    throw error; // Re-throw error for the caller to handle
  }
}
export const deleteBookmarkFromAPI = async (bookmark) => {
  try {
    const endpoint = `${config.BASE_URL}/delete-bookmark/${bookmark.id}`;
    console.log("Deleting bookmark at:", endpoint);

    const response = await fetch(endpoint, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ page_id: bookmark.page_id }), // Ensure your API supports DELETE with a body
    });

    if (!response.ok) {
      throw new Error(`Failed to delete bookmark: ${response.status} - ${response.statusText}`);
    }

    console.log("Bookmark deleted successfully");
    
    // ✅ Handle 204 No Content properly
    return response.status === 204 ? null : await response.json();

  } catch (error) {
    console.error("Error deleting bookmark:", error);
    return error;
  }
};
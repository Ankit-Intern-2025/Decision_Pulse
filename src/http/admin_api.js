import axios from "axios";
import config from "../utils/config";
import { API, apiCaller, getApi, putCaller } from "./dashboard_api";


// manage users api
// export const fetchUsers = async (isActive=true, page=1, rowsPerPage=10, filters) => {
//     try {
//       const endpoint = `/admin/users?page=${page}&page_size=${rowsPerPage}`;
//       const response = await apiCaller(JSON.stringify(filters),{"Content-Type":"application/json"}, endpoint);
//       return response;
//     } catch (error) {
//       console.error(`Error fetching filters for ${modalType}:`, error);
//       throw error; // Re-throw error for the caller to handle
//     }
//   };
export const fetchUsers = async (page=1, rowsPerPage=10, filters) => {
  try {
      let endpoint;
      let response;
      if(filters.search){
        endpoint = `/admin/users/search?query=${filters.search}&page=${page}&page_size=${rowsPerPage}`;
        response = await getApi(endpoint);
      }else{
        endpoint = `/admin/users?page=${page}&page_size=${rowsPerPage}`;
        response = await apiCaller(JSON.stringify(filters),{"Content-Type":"application/json"}, endpoint);
      }
      return response;
    } catch (error) {
      console.error(`Error fetching filters for ${modalType}:`, error);
      throw error; // Re-throw error for the caller to handle
    }
  };
export const postModifyUser = async (request, userId) => {
    try {
      const endpoint = `/admin/users/${userId}/update`;
      const response = await apiCaller(JSON.stringify(request),{"Content-Type":"application/json"}, endpoint);
      return response;
    } catch (error) {
      console.error(`Error fetching filters for ${modalType}:`, error);
      throw error; // Re-throw error for the caller to handle
    }
  };
export const postCreateNewUser = async (request) => {
    try {
      const endpoint = `/admin/create-user`;
      const response = await apiCaller(JSON.stringify(request),{"Content-Type":"application/json"}, endpoint);
      return response;
    } catch (error) {
      console.error(`Error creating user`, error);
      throw error; // Re-throw error for the caller to handle
    }
  };
export const postDeleteUsers = async (request) => {
    try {
      const endpoint = `/admin/users/delete`;
      const response = await apiCaller(JSON.stringify(request),{"Content-Type":"application/json"}, endpoint);
      return response;
    } catch (error) {
      console.error(`Error creating user`, error);
      throw error; // Re-throw error for the caller to handle
    }
  };



// manage dashboard api
  // export const fetchDashboards = async (isActive=true, page=1, rowsPerPage=10, filters) => {
  //   try {
  //     const endpoint = `/admin/dashboards?page=${page}&page_size=${rowsPerPage}`;
  //     const response = await apiCaller(JSON.stringify(filters),{"Content-Type":"application/json"}, endpoint);
  //     return response;
  //   } catch (error) {
  //     console.error(`Error fetching filters for ${modalType}:`, error);
  //     throw error; // Re-throw error for the caller to handle
  //   }
  // };
  export const fetchDashboards = async (activeFilter={}, page=1, rowsPerPage=10, filters) => {
    try {
      let response;
      let endpoint;
      if(filters.search){
        endpoint = `/admin/dashboards/search?query=${filters.search}&page=${page}&page_size=${rowsPerPage}`;
        response = await getApi(endpoint);
      }else{
        endpoint = `/admin/dashboards?page=${page}&page_size=${rowsPerPage}`;
        response = await apiCaller(JSON.stringify(activeFilter),{"Content-Type":"application/json"}, endpoint);

      }
      return response;
    } catch (error) {
      console.error(`Error fetching filters for ${modalType}:`, error);
      throw error; // Re-throw error for the caller to handle
    }
  };

  export const postDeleteDashboards= async (request) => {
    try {
      const endpoint = `/admin/dashboards/delete`;
      const response = await apiCaller(JSON.stringify(request),{"Content-Type":"application/json"}, endpoint);
      return response;
    } catch (error) {
      console.error(`Error creating user`, error);
      throw error; // Re-throw error for the caller to handle
    }
  };

  export const postShareDashboard= async (request, dashboard) => {
    try {
      const endpoint = `/admin/dashboards/${dashboard}/tabs/update`;
      const response = await putCaller(JSON.stringify(request),{"Content-Type":"application/json"}, endpoint);
      return response;
    } catch (error) {
      console.error(`Error creating user`, error);
      throw error; // Re-throw error for the caller to handle
    }
  };
  export const postGrantDashboard= async (request, dashboard) => {
    try {
      const endpoint = `/admin/dashboards/${dashboard}/grant`;
      const response = await apiCaller(JSON.stringify(request),{"Content-Type":"application/json"}, endpoint);
      return response;
    } catch (error) {
      console.error(`Error creating user`, error);
      throw error; // Re-throw error for the caller to handle
    }
  };



  // schedulers 
  export const portReportSchedule= async (request) => {
    try {
      const endpoint = `insert-schedule`;
      const response = await apiCaller(request,{"Content-Type":"multipart/form-data"}, endpoint);
      return response;
    } catch (error) {
      console.error(`Error creating user`, error);
      throw error; // Re-throw error for the caller to handle
    }
  };

  export const postDataSchedule= async (request) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/dags/scheduled_etl_pipeline/dagRuns",
        request,
        {
          headers: { "Content-Type":"application/json" },
        }
      );
      return response;
    } catch (error) {
      console.error(`Error creating user`, error);
      throw error; // Re-throw error for the caller to handle
    }
  };
  export const postRemoveSchedulers= async (request) => {
    try {
      const endpoint = `delete-schedules`;
      const response = await apiCaller(request,{"Content-Type":"application/json"}, endpoint);
      return response;
    } catch (error) {
      console.error(`Error creating user`, error);
      throw error; // Re-throw error for the caller to handle
    }
  };

  export const fetchReportSchedulers= async () => {
    try {
      const endpoint = `get-schedules`;
      const response = await getApi(endpoint);
      return response;
    } catch (error) {
      console.error(`Error creating user`, error);
      throw error; // Re-throw error for the caller to handle
    }
  };


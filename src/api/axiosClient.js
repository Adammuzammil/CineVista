import axios from "axios";
import queryString from "query-string";
import apiconfig from "./apiConfig";

// const baseURL = "https://moonflix-api.vercel.app/api/v1/";

const axiosClient = axios.create({
  baseURL: apiconfig.baseUrl,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});

axiosClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiconfig.apiToken}`,
    },
  };
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    throw err.response.data;
  }
);

export default axiosClient;

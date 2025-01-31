// src/http.js
import axios from "axios";
import { errorAlert, successAlert, infoAlert, warnAlert } from "./index";
import { store } from "../redux/store";
import { hideLoader, showLoader } from "../redux/slices/loaderSlice";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      errorAlert(error.response.data.message || error.message);
      if (
        error.response.data?.err === "ADNTP" ||
        error.response.data?.err === "ITP" ||
        error.message === "ADNTP" ||
        error.message === "ITP"
      ) {
        errorAlert(error.response.data.message || error.message);
        setTimeout(() => {
          window.location.href = window.location.origin + "/auth/login";
          localStorage.removeItem("authToken");
        }, 1000);
      }
      console.error("API Error:", error.response.data.message || error.message);
    } else {
      errorAlert(error.message);
      if (error?.err === "ADNTP" || error?.err === "ITP") {
        errorAlert(error.message);
        setTimeout(() => {
          window.location.href = window.location.origin + "/auth/login";
          localStorage.removeItem("authToken");
          localStorage.removeItem("ls_org");
        }, 1000);
      }
      console.error("Network Error:", error.message);
    }
    return Promise.reject(error);
  }
);

// Common function to make API calls
const httpRequest = async (
  method,
  url,
  data = null,
  headers = {},
  loaderMessage = ""
) => {
  try {
    store.dispatch(showLoader(`${loaderMessage}`));
    const response = await apiClient({
      method,
      url,
      data,
      headers: headers,
    });
    store.dispatch(hideLoader());
    return response;
  } catch (error) {
    store.dispatch(hideLoader());
    throw error;
  }
};

const getData = (endpoint, headers = {}, loaderMessage = "") => {
  return httpRequest("GET", endpoint, null, headers, loaderMessage);
};

const postData = (endpoint, payload, loaderMessage = "") => {
  return httpRequest("POST", endpoint, payload, {}, loaderMessage);
};

export { getData, postData, httpRequest };

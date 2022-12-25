import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const axiosInstance = axios.create();

// const api = (axios: AxiosInstance) => {
//   return {
//     get: <T>(url: string, config: AxiosRequestConfig = {}) =>
//       axios.get<T>(url, config),
//     delete: <T>(url: string, config: AxiosRequestConfig = {}) =>
//       axios.delete<T>(url, config),
//     post: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
//       axios.post<T>(url, body, config),
//     patch: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
//       axios.patch<T>(url, body, config),
//     put: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
//       axios.put<T>(url, body, config),
//   };
// };

axiosInstance.interceptors.request.use(
  function (config: any) {
    config.metadata = { startTime: new Date() };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response: any) {
    response.config.metadata.endTime = new Date();
    response.duration =
      response.config.metadata.endTime - response.config.metadata.startTime;
    return response;
  },
  function (error) {
    error.config.metadata.endTime = new Date();
    error.duration =
      error.config.metadata.endTime - error.config.metadata.startTime;
    return Promise.reject(error);
  }
);

export default axiosInstance;

import { logger } from "./../../pkgs";
import axios, { AxiosRequestConfig } from "axios";
import axiosRetry from "axios-retry";

const axiosInstance = axios.create({
  timeout: 30000,
});

axiosRetry(axiosInstance, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  onRetry(retryCount, error, requestConfig) {
    logger.error(`retrying to send to web hook, retry count: ${retryCount}`);
  },
});
export const sendViaWebook = async (
  url: string,
  data: any,
  requestOptions: AxiosRequestConfig | undefined
) => {
  try {
    const res = axiosInstance.post(url, data, requestOptions);
  } catch (err) {
    logger.error(`faild to send webhook to the url: ${url}`);
  }
};

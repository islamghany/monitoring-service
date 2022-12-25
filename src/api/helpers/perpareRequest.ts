import { checksRepository } from "./../../db/index";
import { Check } from "./../../db/entities/Check";
import axios, { AxiosRequestConfig } from "axios";
import { Agent } from "https";

// this function the id of  a check as argument and return all parameters needed to make
// the request.
const buildURL = (check: Check) => {
  const url = new URL(check.url);

  (url.pathname = check.path || ""),
    (url.port = check.port + ""),
    (url.protocol = check.protocol);

  return url.href;
};

export const prepareRequest = (check: Check) => {
  let requestOptions: AxiosRequestConfig<any> = {
    auth: check.authentication || undefined,
    headers: check.httpHeaders.reduce((x, y) => ({ ...y, ...x })) || undefined,
    timeout: check.timeout * 1000,
    httpAgent: check.ignoreSSL
      ? new Agent({
          rejectUnauthorized: false,
        })
      : undefined,
  };

  return {
    url: buildURL(check),
    requestOptions,
  };
};

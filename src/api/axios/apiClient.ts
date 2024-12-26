import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import config from "@config";
import AxiosCreator from "./AxiosCreator";

const productApiClient: AxiosRequestConfig = {
    baseURL: config.productServerURL,
    responseType: "json",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    }
};

const customerApiClient: AxiosRequestConfig = {
    baseURL: config.customerServerURL,
    responseType: "json",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    }
};

export const axiosProduct = new AxiosCreator(productApiClient);
export const axiosCustomer = new AxiosCreator(customerApiClient);

export function isAxiosResponse(res: AxiosResponse | AxiosError): res is AxiosResponse {
    return (res as AxiosResponse).data != undefined;
}
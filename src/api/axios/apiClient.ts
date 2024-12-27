import { AxiosRequestConfig } from "axios";
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

const managerApiClient: AxiosRequestConfig = {
    baseURL: config.managerServerURL,
    responseType: "json",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    }
};

const inquiryApiClient: AxiosRequestConfig = {
    baseURL: config.inquiryServerURL,
    responseType: "json",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    }
};

export const axiosProduct = new AxiosCreator(productApiClient);
export const axiosCustomer = new AxiosCreator(customerApiClient);
export const axiosManager = new AxiosCreator(managerApiClient);
export const axiosInquiry = new AxiosCreator(inquiryApiClient);
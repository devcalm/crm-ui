import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

type AxiosResCustomType = AxiosResponse | AxiosError;

export default class AxiosCreator {
    private readonly axios: AxiosInstance;

    constructor(axiosConfig?: AxiosRequestConfig) {
        this.axios = axios.create(axiosConfig);
        this.initInterceptorResponse();
    }

    initInterceptorResponse() {
        this.axios.interceptors.response.use((config) => config, async function (error) {
            const response = error.response;
            if (response.status === 404) {
                throw new Error("The requested resource was not found.");
            }
            if (response.status >= 500) {
                throw new Error("A server error occurred. Please try again later.");
            }

            return error;
        });
    }

    async request(config: AxiosRequestConfig): Promise<AxiosResCustomType> {
        return this.axios.request<any, AxiosResCustomType>(config);
    }
};

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import reponseErrorHandler from "./responseErrorHanlder";

export default class AxiosCreator {
    private readonly axios: AxiosInstance;

    constructor(axiosConfig?: AxiosRequestConfig) {
        this.axios = axios.create(axiosConfig);
        this.initInterceptorResponse();
    }

    initInterceptorResponse() {
        this.axios.interceptors.response.use(
            (config) => config,
            (error: AxiosError) => reponseErrorHandler(error));
    }

    async request(config: AxiosRequestConfig): Promise<AxiosResponse> {
        return this.axios.request<any, AxiosResponse>(config);
    }
};

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import reponseErrorHandler from "./responseErrorHanlder";

type AxiosResCustomType = AxiosResponse | AxiosError;

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

    async request(config: AxiosRequestConfig): Promise<AxiosResCustomType> {
        return this.axios.request<any, AxiosResCustomType>(config);
    }
};

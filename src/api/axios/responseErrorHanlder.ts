import { AxiosError, AxiosResponse } from "axios";
import { HttpError } from "@errors/HttpError";
import { ValidationHttpError } from "@errors/ValidationHttpError";

const reponseErrorHandler = (error: AxiosError) => {
    if (!error.status || !error.response) {
        throw new Error("Bad Request");
    }
    const response: AxiosResponse = error.response;
    const detail = response.data?.detail ?? "Unknown error";
    
    if (isValidationError(response)) {
        throw new ValidationHttpError(response.status, detail, response.data.errors);
    }
    throw new HttpError(error.status, detail);
}

function isValidationError(response: AxiosResponse): boolean {
    return response.data.errors !== undefined;
}

export default reponseErrorHandler;
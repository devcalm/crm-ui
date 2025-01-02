import { BackendError } from "@models/dto/BackendError";
import { ValidationHttpError } from '@errors/ValidationHttpError';
import { HttpError } from '@errors/HttpError';

const handleHttpError = (error: unknown): BackendError => {
    if (ValidationHttpError.isInstance(error)) {
        return { detail: error.errorDetail, errors: error.errorsDetails };
    }
    if (HttpError.isInstance(error)) {
        return { detail: error.errorDetail, errors: undefined };
    }
    return { detail: "An unknown error occurred.", errors: undefined };
}
export default handleHttpError;
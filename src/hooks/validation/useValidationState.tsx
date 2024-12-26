export interface ValidationState {
    error?: string;
    wasValidating?: boolean;
}

export interface ValidationResponse {
    type?: 'error' | 'success',
    errorMessage?: string
}

export function createError(message: string): ValidationResponse { 
    return { type: 'error', errorMessage: message }
}

export default function useValidationState(validationState: ValidationState = {}): ValidationResponse {
    const { error, wasValidating } = validationState;

    if (wasValidating) {
        return error
            ? { type: "error", errorMessage: error }
            : { type: "success", errorMessage: undefined }
    }
    return { type: undefined, errorMessage: undefined };
}
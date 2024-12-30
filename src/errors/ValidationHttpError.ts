import { HttpError } from "./HttpError";

export class ValidationHttpError extends HttpError {
    private readonly errors: Record<string, string>;

    constructor(status: number, detail: string, errors: Record<string, string>) {
        super(status, detail);
        this.errors = errors;
    }

    static isInstance(error: unknown): error is ValidationHttpError {
        return error instanceof ValidationHttpError;
    }

    get httpStatus(): number {
        return this.status;
    }

    get errorDetail(): string {
        return this.detail;
    }

    get errorsDetails(): Record<string, string> {
        return this.errors;
    }
}
import { HttpError } from "./HttpError";

export class ValidationHttpError extends HttpError {
    private readonly errors: Record<string, string>;

    constructor(status: number, detail: string, errors: Record<string, string>) {
        super(status, detail);
        this.errors = errors;
    }

}
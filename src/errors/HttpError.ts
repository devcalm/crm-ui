export class HttpError extends Error {
    protected readonly status: number;
    protected readonly detail: string;

    constructor(status: number, detail: string) {
        super(detail);
        this.detail = detail;
        this.status = status;
        Object.setPrototypeOf(this, new.target.prototype);
    }

    static isInstance(error: unknown): error is HttpError {
        return error instanceof HttpError;
    }

    get httpStatus(): number {
        return this.status;
    }

    get errorDetail(): string {
        return this.detail;
    }
}
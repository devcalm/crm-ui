export interface BackendError {
    detail: string,
    errors?: Record<string, string>
}
export interface ApiResponsePagination<T> {
    totalElements: number;
    totalPages: number;
    size: number;
    content: T[];
    number: number;
    first: boolean;
    last: boolean;
    empty: boolean;
}
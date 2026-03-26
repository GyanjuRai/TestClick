
export interface gridResponse<T> {
    data?: T[];
    totalCount: number;
}

export interface responseModel<T> {
    type: string;
    message: string;
    data: T
}
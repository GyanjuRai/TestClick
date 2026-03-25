export interface selParamModel<T>
{
    filter?: T;
    offset?: number;
    pageSize?: number;
    sortBy?: string;
    sortOrder?: string;
}
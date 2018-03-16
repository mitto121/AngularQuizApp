export class ApiResponse<T> {
    displayMessage: string;
    isSucceeded: boolean;
    totalRecordCount: number;
    result: T;
}

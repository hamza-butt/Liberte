export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface ApiResponse<T = any> {
    status_code: number;
    status: boolean;
    message: string;
    data?: T;
}

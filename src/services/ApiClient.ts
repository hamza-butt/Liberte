import { BASE_URL } from './ApiEndpoints';
import {
    ApiError,
    ClientError,
    NetworkError,
    ServerError,
    TimeoutError,
} from './ApiErrors';
import { ApiResponse, HttpMethod } from './ApiTypes';

class ApiClient {
    private baseUrl: string;
    private defaultTimeout: number = 10000; // 10 seconds

    constructor(baseUrl: string = BASE_URL) {
        this.baseUrl = baseUrl;
    }

    async request<T = any>(
        endpoint: string,
        method: HttpMethod,
        params?: any
    ): Promise<ApiResponse<T>> {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), this.defaultTimeout);

        let url = `${this.baseUrl}${endpoint}`;

        console.log("Request URL:", url);
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        });

        const fetchOptions: RequestInit = {
            method,
            headers,
            signal: controller.signal,
        };

        // Handle params based on method
        if (params) {
            if (method === 'GET') {
                // Append params to URL for GET requests
                const queryString = this.buildQueryString(params);
                if (queryString) {
                    url += `?${queryString}`;
                }
            } else {
                // Send params as JSON body for other methods
                fetchOptions.body = JSON.stringify(params);
            }
        }

        try {
            const response = await fetch(url, fetchOptions);

            clearTimeout(id);

            // Handle HTTP errors first (e.g., 404, 500)
            if (!response.ok) {
                await this.handleHttpError(response);
            }

            const responseData: ApiResponse<T> = await response.json();

            // Handle logical errors (e.g., status: false with 200 OK)
            if (responseData.status === false) {
                throw new ApiError(
                    responseData.message || 'Request failed',
                    responseData.status_code,
                    responseData.data
                );
            }

            return responseData;
        } catch (error: any) {
            clearTimeout(id);
            if (error.name === 'AbortError') {
                throw new TimeoutError();
            }
            if (error instanceof ApiError) {
                throw error;
            }
            // If it's a network error or something else unexpected
            throw new NetworkError(error.message);
        }
    }

    /**
     * Helper to build query string from params object.
     */
    private buildQueryString(params: Record<string, any>): string {
        const query = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                query.append(key, String(value));
            }
        });
        return query.toString();
    }

    /**
     * Handle non-2xx HTTP responses.
     */
    private async handleHttpError(response: Response): Promise<void> {
        let errorMessage = `Request failed with status ${response.status}`;
        let errorData: any;

        try {
            errorData = await response.json();
            if (errorData && errorData.message) {
                errorMessage = errorData.message;
            }
        } catch (e) {
            // Response body might not be JSON
        }

        if (response.status >= 500) {
            throw new ServerError(errorMessage, response.status, errorData);
        } else if (response.status >= 400) {
            throw new ClientError(errorMessage, response.status, errorData);
        } else {
            throw new ApiError(errorMessage, response.status, errorData);
        }
    }
}

export const api = new ApiClient();

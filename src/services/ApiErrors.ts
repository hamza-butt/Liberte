
export class ApiError extends Error {
  constructor(message: string, public statusCode?: number, public data?: any) {
    super(message);
    this.name = 'ApiError';
  }
}

export class NetworkError extends ApiError {
  constructor(message = 'Network request failed') {
    super(message);
    this.name = 'NetworkError';
  }
}

export class TimeoutError extends ApiError {
  constructor(message = 'Request timed out') {
    super(message);
    this.name = 'TimeoutError';
  }
}

export class ClientError extends ApiError {
  constructor(message: string, statusCode: number, data?: any) {
    super(message, statusCode, data);
    this.name = 'ClientError';
  }
}

export class ServerError extends ApiError {
  constructor(message: string, statusCode: number, data?: any) {
    super(message, statusCode, data);
    this.name = 'ServerError';
  }
}

export interface IAPISuccessResponse {
  success: boolean;
  message?: string;
  data?: any;
  error?: string;
}

export class ApiSuccess {
  static format(params: {
    message?: string;
    data?: any;
    code?: number;
  }): IAPISuccessResponse {
    return {
      success: true,
      message: params.message,
      data: params.data,
    };
  }
}

export class ApiError {
  static format(error: any, defaultMessage?: string): Error {
    if (error instanceof Error) {
      return error;
    }
    return new Error(defaultMessage || 'An error occurred');
  }
}


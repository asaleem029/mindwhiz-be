export interface IAPISuccessResponse {
  success: boolean;
  message?: string;
  data?: any;
  code?: string;
}
export class ApiSuccess {
  static format(params: {
    message?: string;
    data?: any;
    code?: string;
  }): IAPISuccessResponse {
    return {
      success: true,
      message: params.message,
      data: params.data,
      code: params.code,
    };
  }
}

export class ApiError {
  static format(error: any, defaultMessage: string, statusCode: string): Error {
    if (error instanceof Error) {
      return new Error(`${error.message} (status code: ${statusCode})`);
    }
    return new Error(`${defaultMessage} (status code: ${statusCode})`);
  }
}

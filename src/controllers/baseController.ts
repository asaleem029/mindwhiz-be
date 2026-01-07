import { Response } from 'express';
import { IAPISuccessResponse } from '../utils';

export abstract class BaseController {
  protected sendSuccessResponse(
    res: Response,
    result: IAPISuccessResponse | any,
    language?: string,
    statusCode: number = 200
  ): void {
    const response: IAPISuccessResponse = {
      success: true,
      ...(typeof result === 'object' && result !== null && 'message' in result
        ? { message: result.message }
        : {}),
      ...(typeof result === 'object' && result !== null && 'data' in result
        ? { data: result.data }
        : { data: result }),
    };

    res.status(statusCode).json(response);
  }

  protected sendErrorResponse(
    res: Response,
    error: any,
    language?: string,
    statusCode: number = 500
  ): void {
    const message =
      error instanceof Error
        ? error.message
        : typeof error === 'string'
        ? error
        : 'An error occurred';

    res.status(statusCode).json({
      success: false,
      message,
      ...(process.env.NODE_ENV === 'development' && { error: error?.stack }),
    });
  }
}


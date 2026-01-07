import { Controller, Post } from '@overnightjs/core';
import { Response } from 'express';
import { AuthRoutes } from '../utils/routes/index.js';
import { ICustomHeaders, ICustomRequest } from '../utils/index.js';
import { AuthService } from '../service/index.js';
import { BaseController } from './baseController.js';

@Controller(AuthRoutes.AUTH_BASE_ROUTE)
export class AuthController extends BaseController {
  // --------------------------------------
  // LOGIN
  // --------------------------------------
  @Post(AuthRoutes.LOGIN)
  private async _login(req: ICustomRequest, res: Response) {
    const { language } = req.headers as unknown as ICustomHeaders;
    try {
      const { email, password } = req.body;

      // Call the AuthService to handle the login
      const result = await AuthService.login(email, password);

      this.sendSuccessResponse(res, result, language);
    } catch (error: any) {
      this.sendErrorResponse(res, error, language);
    }
  }
}

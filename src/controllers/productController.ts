import { Controller, Get, Post, Middleware } from '@overnightjs/core';
import { BaseController } from './baseController.js';
import { Response } from 'express';
import { ProductRoutes } from '../utils/routes/index.js';
import { ICustomHeaders, ICustomRequest } from '../utils/index.js';
import { ProductService } from '../service/index.js';
import { UserRole } from '../models/userModel';
import { authenticate, authorize } from '../middleware/auth.js';

@Controller(ProductRoutes.PRODUCT_BASE_ROUTE)
export class ProductController extends BaseController {

  // --------------------------------------
  // CREATE PRODUCT (Requires Authentication & Admin Role)
  // --------------------------------------
  @Post(ProductRoutes.PRODUCT)
  @Middleware([authenticate, authorize(UserRole.ADMIN)])
  private async _create(req: ICustomRequest, res: Response) {
    const { language } = req.headers as unknown as ICustomHeaders;
    try {
      const result = await ProductService.create(req.body);
      this.sendSuccessResponse(res, result, language);
    } catch (error: any) {
      this.sendErrorResponse(res, error, language);
    }
  }

  // --------------------------------------
  // GET ALL PRODUCTS (Public access or can be protected depending on requirement)
  // --------------------------------------
  @Get(ProductRoutes.PRODUCT)
  private async _getAll(req: ICustomRequest, res: Response) {
    const { language } = req.headers as unknown as ICustomHeaders;
    try {
      const result = await ProductService.getAll(req.query);
      this.sendSuccessResponse(res, result, language);
    } catch (error: any) {
      this.sendErrorResponse(res, error, language);
    }
  }

  // --------------------------------------
  // GET PRODUCT BY ID (Public or can be protected depending on the requirement)
  // --------------------------------------
  @Get(ProductRoutes.PRODUCT_BY_ID)
  private async _get(req: ICustomRequest, res: Response) {
    const { language } = req.headers as unknown as ICustomHeaders;
    try {
      const result = await ProductService.getById(req.params.id);
      this.sendSuccessResponse(res, result, language);
    } catch (error: any) {
      this.sendErrorResponse(res, error, language);
    }
  }
}

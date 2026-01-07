import { Controller, Get, Post } from '@overnightjs/core';
import { BaseController } from './baseController.js';
import { Response } from 'express';
import { ProductRoutes } from '../utils/routes/index.js';
import { ICustomHeaders, ICustomRequest } from '../utils/index.js';
import { ProductService } from '../service/index.js';

@Controller(ProductRoutes.PRODUCT_BASE_ROUTE)
export class ProductController extends BaseController {

  // --------------------------------------
  // CREATE PRODUCT
  // --------------------------------------
  @Post(ProductRoutes.PRODUCT)
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
  // GET ALL PRODUCTS
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
  // GET PRODUCT BY ID
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

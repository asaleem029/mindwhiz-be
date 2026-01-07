import { Repository } from 'typeorm';
import { AppDataSource } from '../config/database.js';
import { Product } from '../models/productModel.js';
import { OrmExceptionHandling } from '../utils/OrmExceptionHandling.js';

export abstract class ProductRepository {
    private _repo: Repository<Product>;

    constructor() {
        this._repo = AppDataSource.getRepository(Product);
    }

    async createOne(params: any) {
        try {
            const productEntity = this._repo.create(params);
            const product = await this._repo.save(productEntity);
            return product;
        } catch (error) {
            throw OrmExceptionHandling(error);
        }
    }

    async find(params: any) {
        try {
            const { take, skip, order, ...filters } = params;
            const [products, total] = await this._repo.findAndCount({
                where: filters, 
                skip: skip || 0,
                take: take || 10,
                order: order || {},
            });

            return { data: products, pagination: { total } };
        } catch (error) {
            throw OrmExceptionHandling(error);
        }
    }

    async findOne(params: any) {
        try {
            const product = await this._repo.findOne({
                where: params,
            });
            if (!product) throw new Error('Product not found');
            return product;
        } catch (error) {
            throw OrmExceptionHandling(error);
        }
    }
}

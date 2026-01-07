
import { ProductRepository } from '../repository/index';
import { ProductMessages } from '../utils/responseMessages/index.js';
import { ApiError, ApiSuccess } from '../utils/responses.js';

class ProductService extends ProductRepository {
    async create(params: any) {
        try {
            const data = await this.createOne(params);

            return ApiSuccess.format({
                message: ProductMessages.PRODUCT_CREATED_SUCCESSFULLY.message,
                code: ProductMessages.PRODUCT_CREATED_SUCCESSFULLY.code,
                data,
            });
        } catch (error) {
            throw ApiError.format(error,
                ProductMessages.PRODUCT_CREATION_FAILURE.message,
                ProductMessages.PRODUCT_CREATION_FAILURE.code
            );
        }
    }

    async getAll(query: any) {
        try {
            const data = await this.find(query);

            return ApiSuccess.format({
                message: ProductMessages.PRODUCT_LIST_FETCHED.message,
                code: ProductMessages.PRODUCT_LIST_FETCHED.code,
                data,
            });
        } catch (error) {
            throw ApiError.format(error,
                ProductMessages.PRODUCT_LIST_FETCHING_FAILURE.message,
                ProductMessages.PRODUCT_LIST_FETCHING_FAILURE.code
            );
        }
    }

    async getById(id: string) {
        try {
            const data = await this.findOne({ id });

            return ApiSuccess.format({
                message: ProductMessages.PRODUCT_FETCHED_WITH_ID.message,
                code: ProductMessages.PRODUCT_FETCHED_WITH_ID.code,
                data,
            });
        } catch (error) {
            throw ApiError.format(error,
                ProductMessages.PRODUCT_NOT_FOUND_WITH_ID.message,
                ProductMessages.PRODUCT_NOT_FOUND_WITH_ID.code
            );
        }
    }
}

export default new ProductService();

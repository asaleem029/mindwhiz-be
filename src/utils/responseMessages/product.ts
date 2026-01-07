import { STATUS_CODES } from "http";

export const PRODUCT_CREATED_SUCCESSFULLY = Object.freeze({
    message: "Product created successfully",
    code: STATUS_CODES.CREATED,
});

export const PRODUCT_CREATION_FAILURE = Object.freeze({
    message: "Failed to create product",
    code: STATUS_CODES.INTERNAL_SERVER_ERROR,
});

export const PRODUCT_LIST_FETCHED = Object.freeze({
    message: "Product list fetched successfully",
    code: STATUS_CODES.OK,
});

export const PRODUCT_LIST_FETCHING_FAILURE = Object.freeze({
    message: "Failed to fetch products",
    code: STATUS_CODES.INTERNAL_SERVER_ERROR,
});

export const PRODUCT_FETCHED_WITH_ID = Object.freeze({
    message: "Product fetched successfully with ID",
    code: STATUS_CODES.OK,
});

export const PRODUCT_NOT_FOUND_WITH_ID = Object.freeze({
    message: "Product not found with the given ID",
    code: STATUS_CODES.NOT_FOUND,
});

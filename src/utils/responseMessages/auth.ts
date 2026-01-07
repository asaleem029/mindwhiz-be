import { STATUS_CODES } from "http";

export const LOGIN_SUCCESS = Object.freeze({
    message: "Login Successfully",
    code: STATUS_CODES.OK,
});

export const LOGIN_FAILURE = Object.freeze({
    message: "Login Failure",
    code: STATUS_CODES.UNAUTHORIZED,
});

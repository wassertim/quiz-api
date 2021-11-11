import { login, register } from "../../../controllers/users.controller";
import { createUser, UserErrors, validateUser } from "../../../services/user.service";
import { Request, Response } from "express";
import { err, ok } from "neverthrow";
import { User } from "../../../model/user.model";
import { mockResponse } from "./util/mock";
import { constants } from "http2";
import { mocked } from "ts-jest/utils";

jest.mock("../../../services/user.service");

describe("Register User API", () => {
    test("Should register a user and return CREATED", async () => {
        const user = { login: "laura", password: "mypassword" } as User;
        const req = { body: user } as Request;
        const response = mockResponse();
        const mockedCreateUser = mocked(createUser, true);
        mockedCreateUser.mockResolvedValue(ok(user));

        await register(req, response as Response);

        expect(response.status).toBeCalledWith(constants.HTTP_STATUS_CREATED);
        expect(response.send).toBeCalledWith(user);
    });
    test("Should return BAD_REQUEST when validation error", async () => {
        const req = { body: {} } as Request;
        const response = mockResponse();
        const mockedCreateUser = mocked(createUser, true);
        const errorMessage = "User is invalid";
        mockedCreateUser.mockResolvedValue(err({ code: UserErrors.VALIDATION_ERROR, message: errorMessage }));

        await register(req, response as Response);

        expect(response.status).toBeCalledWith(constants.HTTP_STATUS_BAD_REQUEST);
        expect(response.send).toBeCalledWith(errorMessage);
    });
    test("Should return BAD_REQUEST when user exists", async () => {
        const req = { body: {} } as Request;
        const response = mockResponse();
        const mockedCreateUser = mocked(createUser, true);
        const errorMessage = "User exists";
        mockedCreateUser.mockResolvedValue(err({ code: UserErrors.USER_EXISTS, message: errorMessage }));

        await register(req, response as Response);

        expect(response.status).toBeCalledWith(constants.HTTP_STATUS_BAD_REQUEST);
        expect(response.send).toBeCalledWith(errorMessage);
    });
    test("Should return INTERNAL_SERVER_ERROR when unknown error", async () => {
        const req = { body: {} } as Request;
        const response = mockResponse();
        const mockedCreateUser = mocked(createUser, true);
        const errorMessage = "Unknow error";
        mockedCreateUser.mockResolvedValue(err({ code: UserErrors.UNKNOWN_ERROR, message: errorMessage }));

        await register(req, response as Response);

        expect(response.status).toBeCalledWith(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
        expect(response.send).toBeCalledWith(errorMessage);
    });
});

describe("Login User API", () => {
    test("Should login user and return token", async () => {
        const user = { login: "laura", password: "mypassword" } as User;
        const req = { body: user } as Request;
        const responseText = "token";
        const response = mockResponse();
        const mockedValidateUser = mocked(validateUser, true);
        mockedValidateUser.mockResolvedValue(ok(responseText));

        await login(req, response as Response);

        expect(mockedValidateUser).toHaveBeenCalledWith(user);
        expect(response.status).toHaveBeenCalledWith(constants.HTTP_STATUS_OK);
        expect(response.send).toHaveBeenCalledWith(responseText);
    });
    test("Should login user and return token", async () => {
        const user = { login: "laura", password: "mypassword" } as User;
        const req = { body: user } as Request;
        const response = mockResponse();
        const mockedValidateUser = mocked(validateUser, true);
        const errorMessage = "User is invalid";
        mockedValidateUser.mockResolvedValue(err({ code: UserErrors.VALIDATION_ERROR, message: errorMessage }));

        await login(req, response as Response);

        expect(response.status).toHaveBeenCalledWith(constants.HTTP_STATUS_BAD_REQUEST);
        expect(response.send).toHaveBeenCalledWith(errorMessage);
    });
});

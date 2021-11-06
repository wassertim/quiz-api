import {register} from "../../../controllers/user";
import {createUser, VALIDATION_ERROR} from "../../../services/user";
import {mocked} from 'ts-jest/utils';

jest.mock("../../../services/user");

import {Request, Response} from "express";
import {err, ok} from "neverthrow";
import {User} from "../../../model/user";
import {mockResponse} from "./util/mock";
import {constants} from "http2";
const {HTTP_STATUS_CREATED, HTTP_STATUS_BAD_REQUEST} = constants;

describe("Register User API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("Should register a user and return OK", async () => {
    const user = {login: "laura", password: "mypassword"} as User;
    const req = {body: user} as Request;
    const response = mockResponse();
    const mockedCreateUser = mocked(createUser, true);
    mockedCreateUser.mockResolvedValue(ok(user));

    await register(req, response as Response);

    expect(response.status).toBeCalledWith(HTTP_STATUS_CREATED);
    expect(response.send).toBeCalledWith(user);
  });
  test("Should return BAD_REQUEST on validation error", async () => {
    const req = {body: {}} as Request;
    const response = mockResponse();
    const mockedCreateUser = mocked(createUser, true);
    const errorMessage = "User is invalid";
    mockedCreateUser.mockResolvedValue(err({code: VALIDATION_ERROR, message: errorMessage}));

    await register(req, response as Response);

    expect(response.status).toBeCalledWith(HTTP_STATUS_BAD_REQUEST);
    expect(response.send).toBeCalledWith(errorMessage);
  });
});

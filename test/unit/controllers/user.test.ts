import {register} from "../../../controllers/user";
import {createUser} from "../../../services/user";
import {mocked} from 'ts-jest/utils';

jest.mock("../../../services/user");

import {Request, Response} from "express";
import {ok} from "neverthrow";
import {User} from "../../../model/user";
import {constants} from "http2";
import {mockResponse} from "./util/mock";
const {HTTP_STATUS_CREATED} = constants;

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
});

import {createUser, UserErrors, validateUser} from "../../../services/user";
import {Users} from "../../../db";
import {err, ok} from "neverthrow";
import {getMockedCollection} from "./util/mock";
import {ServiceError} from "../../../types/errors";
import bcrypt from "bcrypt";
import {mocked} from "ts-jest/utils";

jest.mock("bcrypt");
jest.mock("../../../db");

describe("User Service Create User", () => {
  test("Should return ok when normal flow", async () => {
    const user = {login: "laura", password: "mypassword"};
    const mockUserCollection = getMockedCollection(Users);
    mockUserCollection.findOne = jest.fn().mockImplementation(() => undefined);
    mockUserCollection.insertOne = jest.fn().mockImplementation(() => user);

    const result = await createUser(user);

    expect(mockUserCollection.findOne).toBeCalledWith({login: user.login});
    expect(result).toStrictEqual(ok(user));
  });
  test("Should return err when user found", async () => {
    const user = {login: "laura", password: "mypassword"};
    const mockUserCollection = getMockedCollection(Users);
    mockUserCollection.findOne = jest.fn().mockImplementation(() => ({}));
    const errObj = {
      code: UserErrors.USER_EXISTS,
      message: "User with login laura already exists"
    } as ServiceError<UserErrors>;

    const result = await createUser(user);

    expect(mockUserCollection.findOne).toBeCalledWith({login: user.login});
    expect(result).toStrictEqual(err(errObj));
  });
});

describe("User Service Validate User", () => {
  test("Should validate user and return a token", async () => {
    const user = {login: "laura", password: "mypassword"};
    const mockUserCollection = getMockedCollection(Users);
    const foundUser = {login: user.login, password: "encrypted"};
    mockUserCollection.findOne = jest.fn().mockImplementation(() => foundUser);
    const mockedCompare = mocked(bcrypt.compare, true).mockImplementation(() => Promise.resolve(true));

    const token = await validateUser(user);

    expect(mockedCompare).toHaveBeenCalledWith(user.password, foundUser.password);
    expect(token).toStrictEqual(ok("Basic bGF1cmE6bXlwYXNzd29yZA=="));
  });
});

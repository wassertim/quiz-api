import {createUser, UserErrors} from "../../../services/user";
import {Users} from "../../../db";
import {err, ok} from "neverthrow";
import {getMockedCollection} from "./util/mock";
import {ServiceError} from "../../../types/errors";

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

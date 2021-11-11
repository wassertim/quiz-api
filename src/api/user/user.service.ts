import { err, ok, Result } from "neverthrow";
import { ServiceError } from "../../types/errors";
import { User } from "../../model/user.model";
import { Users } from "../../db";
import bcrypt from "bcrypt";

export enum UserErrors {
    USER_EXISTS,
    VALIDATION_ERROR,
    UNKNOWN_ERROR,
    UNAUTHORIZED,
}

const getHash = (password: string) => bcrypt.hash(password, 10);

export async function createUser(user: User): Promise<Result<User, ServiceError<UserErrors>>> {
    const { login, password } = user;
    try {
        if (await Users().findOne({ login })) {
            return err({
                code: UserErrors.USER_EXISTS,
                message: `User with login ${login} already exists`,
            });
        }

        await Users().insertOne({ login, password: await getHash(password) });
        
        return ok(user);
    } catch (e) {
        return err({ code: UserErrors.UNKNOWN_ERROR, message: `${e}` });
    }
}

export async function validateUser(user: User): Promise<Result<string, ServiceError<UserErrors>>> {
    const { login, password } = user;
    try {
        const foundUser = await Users().findOne({ login });
        const unauthorizedMessage = "Username or password are incorrect";
        if (!foundUser) {
            return err({
                code: UserErrors.UNAUTHORIZED,
                message: unauthorizedMessage,
            });
        }
        const isUserValid = await bcrypt.compare(password, foundUser.password!);
        if (!isUserValid) {
            return err({
                code: UserErrors.UNAUTHORIZED,
                message: unauthorizedMessage,
            });
        }

        const authBase64 = Buffer.from(`${user.login}:${password}`).toString("base64");

        return ok(`Basic ${authBase64}`);
    } catch (e) {
        return err({ code: UserErrors.UNKNOWN_ERROR, message: `${e}` });
    }
}

import {BasicVerifyFunction} from "passport-http";
import {validateUser} from "../services/user";

export const verify: BasicVerifyFunction = async (login, password, done) => {
  const user = {login, password};

  return (await validateUser(user))
      .map(() => done(null, user))
      .mapErr(() => done(null, false))
      .unwrapOr(() => done(null, false));
};

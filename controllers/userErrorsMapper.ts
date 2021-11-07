import {UserErrors} from "../services/user";
import {constants} from "http2";

const userErrorToHttpStatusCode: Record<number, number> = {};
userErrorToHttpStatusCode[UserErrors.VALIDATION_ERROR] = constants.HTTP_STATUS_BAD_REQUEST;
userErrorToHttpStatusCode[UserErrors.USER_EXISTS] = constants.HTTP_STATUS_BAD_REQUEST;
userErrorToHttpStatusCode[UserErrors.UNAUTHORIZED] = constants.HTTP_STATUS_UNAUTHORIZED;
userErrorToHttpStatusCode[UserErrors.UNKNOWN_ERROR] = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;

export function mapToStatusCode(userError: UserErrors) {
  return userErrorToHttpStatusCode[userError] || constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
}

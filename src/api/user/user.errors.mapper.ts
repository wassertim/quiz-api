import { ApiError } from "../../types/errors";
import { constants } from "http2";

const userErrorToHttpStatusCode: Record<number, number> = {};
userErrorToHttpStatusCode[ApiError.VALIDATION_ERROR] = constants.HTTP_STATUS_BAD_REQUEST;
userErrorToHttpStatusCode[ApiError.ENTITY_EXISTS] = constants.HTTP_STATUS_BAD_REQUEST;
userErrorToHttpStatusCode[ApiError.UNAUTHORIZED] = constants.HTTP_STATUS_UNAUTHORIZED;
userErrorToHttpStatusCode[ApiError.UNKNOWN_ERROR] = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;

export function mapToStatusCode(userError: ApiError) {
    return userErrorToHttpStatusCode[userError] || constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
}

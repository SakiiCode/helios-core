import { DisplayableError, RestResponse } from '../../common/rest/RestResponse';
/**
 * @see https://wiki.vg/Authentication#Errors
 */
export declare enum MojangErrorCode {
    ERROR_METHOD_NOT_ALLOWED = 0,
    ERROR_NOT_FOUND = 1,
    ERROR_USER_MIGRATED = 2,
    ERROR_INVALID_CREDENTIALS = 3,
    ERROR_RATELIMIT = 4,
    ERROR_INVALID_TOKEN = 5,
    ERROR_ACCESS_TOKEN_HAS_PROFILE = 6,
    ERROR_CREDENTIALS_MISSING = 7,
    ERROR_INVALID_SALT_VERSION = 8,
    ERROR_UNSUPPORTED_MEDIA_TYPE = 9,
    ERROR_GONE = 10,
    ERROR_UNREACHABLE = 11,
    ERROR_NOT_PAID = 12,
    UNKNOWN = 13
}
export declare function mojangErrorDisplayable(errorCode: MojangErrorCode): DisplayableError;
export interface MojangResponse<T> extends RestResponse<T> {
    mojangErrorCode?: MojangErrorCode;
    isInternalError?: boolean;
}
export interface MojangErrorBody {
    error: string;
    errorMessage: string;
    cause?: string;
}
/**
 * Resolve the error response code from the response body.
 *
 * @param body The mojang error body response.
 */
export declare function decipherErrorCode(body: MojangErrorBody): MojangErrorCode;
export declare function isInternalError(errorCode: MojangErrorCode): boolean;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInternalError = exports.decipherErrorCode = exports.MojangErrorCode = void 0;
/**
 * @see https://wiki.vg/Authentication#Errors
 */
var MojangErrorCode;
(function (MojangErrorCode) {
    MojangErrorCode[MojangErrorCode["ERROR_METHOD_NOT_ALLOWED"] = 0] = "ERROR_METHOD_NOT_ALLOWED";
    MojangErrorCode[MojangErrorCode["ERROR_NOT_FOUND"] = 1] = "ERROR_NOT_FOUND";
    MojangErrorCode[MojangErrorCode["ERROR_USER_MIGRATED"] = 2] = "ERROR_USER_MIGRATED";
    MojangErrorCode[MojangErrorCode["ERROR_INVALID_CREDENTIALS"] = 3] = "ERROR_INVALID_CREDENTIALS";
    MojangErrorCode[MojangErrorCode["ERROR_RATELIMIT"] = 4] = "ERROR_RATELIMIT";
    MojangErrorCode[MojangErrorCode["ERROR_INVALID_TOKEN"] = 5] = "ERROR_INVALID_TOKEN";
    MojangErrorCode[MojangErrorCode["ERROR_ACCESS_TOKEN_HAS_PROFILE"] = 6] = "ERROR_ACCESS_TOKEN_HAS_PROFILE";
    MojangErrorCode[MojangErrorCode["ERROR_CREDENTIALS_MISSING"] = 7] = "ERROR_CREDENTIALS_MISSING";
    MojangErrorCode[MojangErrorCode["ERROR_INVALID_SALT_VERSION"] = 8] = "ERROR_INVALID_SALT_VERSION";
    MojangErrorCode[MojangErrorCode["ERROR_UNSUPPORTED_MEDIA_TYPE"] = 9] = "ERROR_UNSUPPORTED_MEDIA_TYPE";
    MojangErrorCode[MojangErrorCode["ERROR_GONE"] = 10] = "ERROR_GONE";
    MojangErrorCode[MojangErrorCode["ERROR_UNREACHABLE"] = 11] = "ERROR_UNREACHABLE";
    MojangErrorCode[MojangErrorCode["ERROR_NOT_PAID"] = 12] = "ERROR_NOT_PAID";
    MojangErrorCode[MojangErrorCode["UNKNOWN"] = 13] = "UNKNOWN";
})(MojangErrorCode || (exports.MojangErrorCode = MojangErrorCode = {}));
/**
 * Resolve the error response code from the response body.
 *
 * @param body The mojang error body response.
 */
function decipherErrorCode(body) {
    if (body.error === 'Method Not Allowed') {
        return MojangErrorCode.ERROR_METHOD_NOT_ALLOWED;
    }
    else if (body.error === 'Not Found') {
        return MojangErrorCode.ERROR_NOT_FOUND;
    }
    else if (body.error === 'Unsupported Media Type') {
        return MojangErrorCode.ERROR_UNSUPPORTED_MEDIA_TYPE;
    }
    else if (body.error === 'ForbiddenOperationException') {
        if (body.cause && body.cause === 'UserMigratedException') {
            return MojangErrorCode.ERROR_USER_MIGRATED;
        }
        if (body.errorMessage === 'Invalid credentials. Invalid username or password.') {
            return MojangErrorCode.ERROR_INVALID_CREDENTIALS;
        }
        else if (body.errorMessage === 'Invalid credentials.') {
            return MojangErrorCode.ERROR_RATELIMIT;
        }
        else if (body.errorMessage === 'Invalid token.') {
            return MojangErrorCode.ERROR_INVALID_TOKEN;
        }
        else if (body.errorMessage === 'Forbidden') {
            return MojangErrorCode.ERROR_CREDENTIALS_MISSING;
        }
    }
    else if (body.error === 'IllegalArgumentException') {
        if (body.errorMessage === 'Access token already has a profile assigned.') {
            return MojangErrorCode.ERROR_ACCESS_TOKEN_HAS_PROFILE;
        }
        else if (body.errorMessage === 'Invalid salt version') {
            return MojangErrorCode.ERROR_INVALID_SALT_VERSION;
        }
    }
    else if (body.error === 'ResourceException' || body.error === 'GoneException') {
        return MojangErrorCode.ERROR_GONE;
    }
    return MojangErrorCode.UNKNOWN;
}
exports.decipherErrorCode = decipherErrorCode;
// These indicate problems with the code and not the data.
function isInternalError(errorCode) {
    switch (errorCode) {
        case MojangErrorCode.ERROR_METHOD_NOT_ALLOWED: // We've sent the wrong method to an endpoint. (ex. GET to POST)
        case MojangErrorCode.ERROR_NOT_FOUND: // Indicates endpoint has changed. (404)
        case MojangErrorCode.ERROR_ACCESS_TOKEN_HAS_PROFILE: // Selecting profiles isn't implemented yet. (Shouldnt happen)
        case MojangErrorCode.ERROR_CREDENTIALS_MISSING: // Username/password was not submitted. (UI should forbid this)
        case MojangErrorCode.ERROR_INVALID_SALT_VERSION: // ??? (Shouldnt happen)
        case MojangErrorCode.ERROR_UNSUPPORTED_MEDIA_TYPE: // Data was not submitted as application/json
            return true;
        default:
            return false;
    }
}
exports.isInternalError = isInternalError;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGotError = exports.isDisplayableError = exports.RestResponseStatus = void 0;
const got_1 = require("got");
/**
 * Rest Response status.
 */
var RestResponseStatus;
(function (RestResponseStatus) {
    /**
     * Status indicating the request was successful.
     */
    RestResponseStatus[RestResponseStatus["SUCCESS"] = 0] = "SUCCESS";
    /**
     * Status indicating there was a problem with the response.
     * All status codes outside the 200 range will have an error status.
     */
    RestResponseStatus[RestResponseStatus["ERROR"] = 1] = "ERROR";
})(RestResponseStatus = exports.RestResponseStatus || (exports.RestResponseStatus = {}));
function isDisplayableError(it) {
    return typeof it == 'object'
        && it != null
        && Object.prototype.hasOwnProperty.call(it, 'title')
        && Object.prototype.hasOwnProperty.call(it, 'desc');
}
exports.isDisplayableError = isDisplayableError;
/**
 * Handle a got error for a generic RestResponse.
 *
 * @param operation The operation name, for logging purposes.
 * @param error The error that occurred.
 * @param logger A logger instance.
 * @param dataProvider A function to provide a response body.
 * @returns A RestResponse configured with error information.
 */
function handleGotError(operation, error, logger, dataProvider) {
    const response = {
        data: dataProvider(),
        responseStatus: RestResponseStatus.ERROR,
        error
    };
    if (error instanceof got_1.HTTPError) {
        logger.error(`Error during ${operation} request (HTTP Response ${error.response.statusCode})`, error);
        logger.debug('Response Details:');
        logger.debug(`URL: ${error.request.requestUrl}`);
        logger.debug('Body:', error.response.body);
        logger.debug('Headers:', error.response.headers);
    }
    else if (error.name === 'RequestError') {
        logger.error(`${operation} request received no response (${error.code}).`, error);
    }
    else if (error instanceof got_1.TimeoutError) {
        logger.error(`${operation} request timed out (${error.timings.phases.total}ms).`);
    }
    else if (error instanceof got_1.ParseError) {
        logger.error(`${operation} request received unexepected body (Parse Error).`);
    }
    else {
        // CacheError, ReadError, MaxRedirectsError, UnsupportedProtocolError, CancelError
        logger.error(`Error during ${operation} request.`, error);
    }
    return response;
}
exports.handleGotError = handleGotError;

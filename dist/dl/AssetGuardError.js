"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetGuardError = void 0;
class AssetGuardError extends Error {
    code;
    stack;
    error;
    constructor(message, error) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        // Reference: https://github.com/sindresorhus/got/blob/master/source/core/index.ts#L340
        if (error) {
            this.error = error;
            this.code = error?.code;
            if (error.stack != null) {
                const indexOfMessage = this.stack.indexOf(this.message) + this.message.length;
                const thisStackTrace = this.stack.slice(indexOfMessage).split('\n').reverse();
                const errorStackTrace = error.stack.slice(error.stack.indexOf(error.message) + error.message.length).split('\n').reverse();
                // Remove duplicated traces
                while (errorStackTrace.length !== 0 && errorStackTrace[0] === thisStackTrace[0]) {
                    thisStackTrace.shift();
                }
                this.stack = `${this.stack.slice(0, indexOfMessage)}${thisStackTrace.reverse().join('\n')}${errorStackTrace.reverse().join('\n')}`;
            }
        }
    }
}
exports.AssetGuardError = AssetGuardError;

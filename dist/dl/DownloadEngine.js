"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadFile = exports.downloadQueue = exports.getExpectedDownloadSize = void 0;
const fs_1 = require("fs");
const got_1 = __importStar(require("got"));
const promises_1 = require("stream/promises");
const fastq = __importStar(require("fastq"));
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const LoggerUtil_1 = require("../util/LoggerUtil");
const NodeUtil_1 = require("../util/NodeUtil");
const log = LoggerUtil_1.LoggerUtil.getLogger('DownloadEngine');
function getExpectedDownloadSize(assets) {
    return assets.map(({ size }) => size).reduce((acc, v) => acc + v, 0);
}
exports.getExpectedDownloadSize = getExpectedDownloadSize;
async function downloadQueue(assets, onProgress) {
    const receivedTotals = assets.map(({ id }) => id).reduce((acc, id) => ({ ...acc, [id]: 0 }), ({}));
    let received = 0;
    const onEachProgress = (asset) => {
        return ({ transferred }) => {
            received += (transferred - receivedTotals[asset.id]);
            receivedTotals[asset.id] = transferred;
            onProgress(received);
        };
    };
    const wrap = (asset) => downloadFile(asset.url, asset.path, onEachProgress(asset));
    const q = fastq.promise(wrap, 15);
    const promises = assets.map(asset => q.push(asset)).reduce((acc, p) => ([...acc, p]), []);
    await Promise.all(promises);
    return receivedTotals;
}
exports.downloadQueue = downloadQueue;
async function downloadFile(url, path, onProgress) {
    await (0, fs_extra_1.ensureDir)((0, path_1.dirname)(path));
    const MAX_RETRIES = 10;
    let fileWriterStream = null; // The write stream.
    let retryCount = 0; // The number of retries attempted.
    let error = null; // The caught error.
    let retry = false; // Should we retry.
    let rethrow = false; // Should we throw an error.
    // Got's streaming retry API is nonexistant and their "example" is egregious.
    // To use their "api" you need to commit yourself to recursive callback hell.
    // No thank you, I prefer this simpler, non error-prone logic.
    do {
        retry = false;
        rethrow = false;
        if (retryCount > 0) {
            log.debug(`Retry attempt #${retryCount} for ${url}.`);
        }
        try {
            const downloadStream = got_1.default.stream(url);
            fileWriterStream = (0, fs_1.createWriteStream)(path);
            if (onProgress) {
                downloadStream.on('downloadProgress', progress => onProgress(progress));
            }
            await (0, promises_1.pipeline)(downloadStream, fileWriterStream);
        }
        catch (err) {
            error = err;
            retryCount++;
            rethrow = true;
            // For now, only retry timeouts.
            retry = retryCount <= MAX_RETRIES && retryableError(error);
            if (fileWriterStream) {
                fileWriterStream.destroy();
            }
            if (onProgress && retry) {
                // Reset progress on this asset. since we're going to retry.
                onProgress({ transferred: 0, percent: 0, total: 0 });
            }
            if (retry) {
                // Wait one second before retrying.
                // This can become an exponential backoff, but I see no need for that right now.
                await (0, NodeUtil_1.sleep)(1000);
            }
        }
    } while (retry);
    if (rethrow && error) {
        if (retryCount > MAX_RETRIES) {
            log.error(`Maximum retries attempted for ${url}. Rethrowing exception.`);
        }
        else {
            log.error(`Unknown or unretryable exception thrown during request to ${url}. Rethrowing exception.`);
        }
        throw error;
    }
}
exports.downloadFile = downloadFile;
function retryableError(error) {
    if (error instanceof got_1.RequestError) {
        // error.name === 'RequestError' means server did not respond.
        return error.name === 'RequestError' || error instanceof got_1.ReadError && error.code === 'ECONNRESET';
    }
    else {
        return false;
    }
}

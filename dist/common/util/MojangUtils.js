"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mcVersionAtLeast = exports.isLibraryCompatible = exports.validateLibraryNatives = exports.validateLibraryRules = exports.getMojangOS = void 0;
const semver_1 = __importDefault(require("semver"));
function getMojangOS() {
    const opSys = process.platform;
    switch (opSys) {
        case 'darwin':
            return 'osx';
        case 'win32':
            return 'windows';
        case 'linux':
            return 'linux';
        default:
            return opSys;
    }
}
exports.getMojangOS = getMojangOS;
function validateLibraryRules(rules) {
    if (rules == null) {
        return false;
    }
    for (const rule of rules) {
        if (rule.action != null && rule.os != null) {
            const osName = rule.os.name;
            const osMoj = getMojangOS();
            if (rule.action === 'allow') {
                return osName === osMoj;
            }
            else if (rule.action === 'disallow') {
                return osName !== osMoj;
            }
        }
    }
    return true;
}
exports.validateLibraryRules = validateLibraryRules;
function validateLibraryNatives(natives) {
    return natives == null ? true : Object.hasOwnProperty.call(natives, getMojangOS());
}
exports.validateLibraryNatives = validateLibraryNatives;
function isLibraryCompatible(rules, natives) {
    return rules == null ? validateLibraryNatives(natives) : validateLibraryRules(rules);
}
exports.isLibraryCompatible = isLibraryCompatible;
/**
 * Returns true if the actual version is greater than
 * or equal to the desired version.
 *
 * @param {string} desired The desired version.
 * @param {string} actual The actual version.
 */
function mcVersionAtLeast(desired, actual) {
    return semver_1.default.satisfies(actual, `>=${desired}`);
}
exports.mcVersionAtLeast = mcVersionAtLeast;

import { Rule, Natives } from '../../dl/mojang/MojangTypes';
export declare function getMojangOS(): string;
export declare function validateLibraryRules(rules?: Rule[]): boolean;
export declare function validateLibraryNatives(natives?: Natives): boolean;
export declare function isLibraryCompatible(rules?: Rule[], natives?: Natives): boolean;
/**
 * Returns true if the actual version is greater than
 * or equal to the desired version.
 *
 * @param {string} desired The desired version.
 * @param {string} actual The actual version.
 */
export declare function mcVersionAtLeast(desired: string, actual: string): boolean;

export declare class AssetGuardError extends Error {
    code?: string;
    stack: string;
    error?: Partial<Error & {
        code?: string;
    }>;
    constructor(message: string, error?: Partial<Error & {
        code?: string;
    }>);
}

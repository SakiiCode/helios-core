import { Asset } from './Asset';
export declare abstract class IndexProcessor {
    protected commonDir: string;
    constructor(commonDir: string);
    abstract init(): Promise<void>;
    abstract totalStages(): number;
    abstract validate(onStageComplete: () => Promise<void>): Promise<{
        [category: string]: Asset[];
    }>;
    abstract postDownload(): Promise<void>;
}

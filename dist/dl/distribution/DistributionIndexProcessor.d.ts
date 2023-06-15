import { IndexProcessor } from '../IndexProcessor';
import { Asset } from '../Asset';
import { HeliosDistribution } from '../../common/distribution/DistributionFactory';
export declare class DistributionIndexProcessor extends IndexProcessor {
    protected distribution: HeliosDistribution;
    protected serverId: string;
    private static readonly logger;
    constructor(commonDir: string, distribution: HeliosDistribution, serverId: string);
    init(): Promise<void>;
    totalStages(): number;
    validate(onStageComplete: () => Promise<void>): Promise<{
        [category: string]: Asset[];
    }>;
    postDownload(): Promise<void>;
    private validateModules;
    loadForgeVersionJson(): Promise<any>;
    static isForgeGradle3(mcVersion: string, forgeVersion: string): boolean;
}

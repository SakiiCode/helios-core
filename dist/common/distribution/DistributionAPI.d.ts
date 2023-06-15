import { Distribution } from 'helios-distribution-types';
import { RestResponse } from '../rest/RestResponse';
import { HeliosDistribution } from './DistributionFactory';
export declare class DistributionAPI {
    private launcherDirectory;
    private commonDir;
    private instanceDir;
    private remoteUrl;
    private devMode;
    private static readonly log;
    private readonly DISTRO_FILE;
    private readonly DISTRO_FILE_DEV;
    private distroPath;
    private distroDevPath;
    private distribution;
    private rawDistribution;
    constructor(launcherDirectory: string, commonDir: string, instanceDir: string, remoteUrl: string, devMode: boolean);
    getDistribution(): Promise<HeliosDistribution>;
    getDistributionLocalLoadOnly(): Promise<HeliosDistribution>;
    refreshDistributionOrFallback(): Promise<HeliosDistribution>;
    toggleDevMode(dev: boolean): void;
    isDevMode(): boolean;
    protected loadDistribution(): Promise<Distribution>;
    protected _loadDistributionNullable(): Promise<Distribution | null>;
    protected pullRemote(): Promise<RestResponse<Distribution | null>>;
    protected writeDistributionToDisk(distribution: Distribution): Promise<void>;
    protected pullLocal(): Promise<Distribution | null>;
    protected readDistributionFromFile(path: string): Promise<Distribution | null>;
}

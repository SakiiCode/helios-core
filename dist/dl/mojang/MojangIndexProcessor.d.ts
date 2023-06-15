import { Asset } from '../Asset';
import { IndexProcessor } from '../IndexProcessor';
import { VersionJson } from './MojangTypes';
export declare class MojangIndexProcessor extends IndexProcessor {
    protected version: string;
    static readonly LAUNCHER_JSON_ENDPOINT = "https://launchermeta.mojang.com/mc/launcher.json";
    static readonly VERSION_MANIFEST_ENDPOINT = "https://piston-meta.mojang.com/mc/game/version_manifest_v2.json";
    static readonly ASSET_RESOURCE_ENDPOINT = "https://resources.download.minecraft.net";
    private static readonly logger;
    private versionJson;
    private assetIndex;
    private client;
    private assetPath;
    constructor(commonDir: string, version: string);
    /**
     * Download https://piston-meta.mojang.com/mc/game/version_manifest_v2.json
     *   Unable to download:
     *     Proceed, check versions directory for target version
     *       If version.json not present, fatal error.
     *       If version.json present, load and use.
     *   Able to download:
     *     Download, use in memory only.
     *     Locate target version entry.
     *     Extract hash
     *     Validate local exists and matches hash
     *       Condition fails: download
     *         Download fails: fatal error
     *         Download succeeds: Save to disk, continue
     *       Passes: load from file
     *
     * Version JSON in memory
     *   Extract assetIndex
     *     Check that local exists and hash matches
     *       if false, download
     *         download fails: fatal error
     *       if true: load from disk and use
     *
     * complete init when 3 files are validated and loaded.
     *
     */
    init(): Promise<void>;
    getVersionJson(): Promise<VersionJson>;
    private loadAssetIndex;
    private loadVersionJson;
    private loadContentWithRemoteFallback;
    private loadVersionManifest;
    private getAssetIndexPath;
    totalStages(): number;
    validate(onStageComplete: () => Promise<void>): Promise<{
        [category: string]: Asset[];
    }>;
    postDownload(): Promise<void>;
    private validateAssets;
    private validateLibraries;
    private validateClient;
    private validateLogConfig;
}

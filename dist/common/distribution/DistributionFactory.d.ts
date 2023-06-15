import { Distribution, Server, Module, Required as HeliosRequired, JavaVersionProps } from 'helios-distribution-types';
import { MavenComponents } from '../util/MavenUtil';
export declare class HeliosDistribution {
    readonly rawDistribution: Distribution;
    private mainServerIndex;
    readonly servers: HeliosServer[];
    constructor(rawDistribution: Distribution, commonDir: string, instanceDir: string);
    private resolveMainServerIndex;
    getMainServer(): HeliosServer | null;
    getServerById(id: string): HeliosServer | null;
}
export declare class HeliosServer {
    readonly rawServer: Server;
    readonly modules: HeliosModule[];
    readonly hostname: string;
    readonly port: number;
    readonly effectiveJavaOptions: Required<JavaVersionProps>;
    constructor(rawServer: Server, commonDir: string, instanceDir: string);
    private parseAddress;
    private parseEffectiveJavaOptions;
    private defaultUndefinedJavaOptions;
}
export declare class HeliosModule {
    readonly rawModule: Module;
    private readonly serverId;
    readonly subModules: HeliosModule[];
    private readonly mavenComponents;
    private readonly required;
    private readonly localPath;
    constructor(rawModule: Module, serverId: string, commonDir: string, instanceDir: string);
    private resolveMavenComponents;
    private resolveRequired;
    private resolveLocalPath;
    hasMavenComponents(): boolean;
    getMavenComponents(): Readonly<MavenComponents>;
    getRequired(): Readonly<Required<HeliosRequired>>;
    getPath(): string;
    getMavenIdentifier(): string;
    getExtensionlessMavenIdentifier(): string;
    getVersionlessMavenIdentifier(): string;
    hasSubModules(): boolean;
}

/// <reference types="node" />
/// <reference types="node" />
import { ChildProcess } from 'child_process';
declare abstract class BaseTransmitter {
    protected receiver: ChildProcess;
    spawnReceiver(additionalEnvVars?: NodeJS.ProcessEnv): void;
    abstract receiverName(): string;
    destroyReceiver(): void;
    get childProcess(): ChildProcess;
}
export declare class FullRepair extends BaseTransmitter {
    private commonDirectory;
    private instanceDirectory;
    private launcherDirectory;
    private serverId;
    private devMode;
    constructor(commonDirectory: string, instanceDirectory: string, launcherDirectory: string, serverId: string, devMode: boolean);
    receiverName(): string;
    verifyFiles(onProgress: (percent: number) => void): Promise<number>;
    download(onProgress: (percent: number) => void): Promise<void>;
}
export {};

import { ErrorReply, Receiver } from './Receiver';
export type FullRepairTransmission = ValidateTransmission | DownloadTransmission;
export interface ValidateTransmission {
    action: 'validate';
    serverId: string;
    launcherDirectory: string;
    commonDirectory: string;
    instanceDirectory: string;
    devMode: boolean;
}
export interface DownloadTransmission {
    action: 'download';
}
export type FullRepairReply = ValidateProgressReply | ValidateCompleteReply | DownloadProgressReply | DownloadCompleteReply | ErrorReply;
export interface ValidateProgressReply {
    response: 'validateProgress';
    percent: number;
}
export interface ValidateCompleteReply {
    response: 'validateComplete';
    invalidCount: number;
}
export interface DownloadProgressReply {
    response: 'downloadProgress';
    percent: number;
}
export interface DownloadCompleteReply {
    response: 'downloadComplete';
}
export declare class FullRepairReceiver implements Receiver {
    private processors;
    private assets;
    execute(message: FullRepairTransmission): Promise<void>;
    parseError(error: unknown): Promise<string | undefined>;
    validate(message: ValidateTransmission): Promise<void>;
    download(_message: DownloadTransmission): Promise<void>;
}

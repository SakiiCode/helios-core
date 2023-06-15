export interface ServerStatus {
    version: {
        name: string;
        protocol: number;
    };
    players: {
        max: number;
        online: number;
        sample: {
            name: string;
            id: string;
        }[];
    };
    description: {
        text: string;
    };
    favicon: string;
    modinfo?: {
        type: string;
        modList: {
            modid: string;
            version: string;
        }[];
    };
    retrievedAt: number;
}
export declare function getServerStatus(protocol: number, hostname: string, port?: number): Promise<ServerStatus>;

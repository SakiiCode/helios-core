import { MojangResponse } from './MojangResponse';
export interface Agent {
    name: 'Minecraft';
    version: number;
}
export interface AuthPayload {
    agent: Agent;
    username: string;
    password: string;
    clientToken?: string;
    requestUser?: boolean;
}
export interface Session {
    accessToken: string;
    clientToken: string;
    selectedProfile: {
        id: string;
        name: string;
    };
    user?: {
        id: string;
        properties: Array<{
            name: string;
            value: string;
        }>;
    };
}
export declare enum MojangStatusColor {
    RED = "red",
    YELLOW = "yellow",
    GREEN = "green",
    GREY = "grey"
}
export interface MojangStatus {
    service: string;
    status: MojangStatusColor;
    name: string;
    essential: boolean;
}
export interface UpptimeSummary {
    slug: string;
    status: 'up' | 'down';
}
export declare class MojangRestAPI {
    private static readonly logger;
    private static readonly TIMEOUT;
    static readonly AUTH_ENDPOINT = "https://authserver.mojang.com";
    static readonly STATUS_ENDPOINT = "https://raw.githubusercontent.com/AventiumSoftworks/helios-status-page/master/history/summary.json";
    private static authClient;
    private static statusClient;
    static readonly MINECRAFT_AGENT: Agent;
    protected static statuses: MojangStatus[];
    static getDefaultStatuses(): MojangStatus[];
    /**
     * Converts a Mojang status color to a hex value. Valid statuses
     * are 'green', 'yellow', 'red', and 'grey'. Grey is a custom status
     * to our project which represents an unknown status.
     */
    static statusToHex(status: string): string;
    /**
     * MojangRestAPI implementation of handleGotError. This function will additionally
     * analyze the response from Mojang and populate the mojang-specific error information.
     *
     * @param operation The operation name, for logging purposes.
     * @param error The error that occurred.
     * @param dataProvider A function to provide a response body.
     * @returns A MojangResponse configured with error information.
     */
    private static handleGotError;
    /**
     * Utility function to report an unexpected success code. An unexpected
     * code may indicate an API change.
     *
     * @param operation The operation name.
     * @param expected The expected response code.
     * @param actual The actual response code.
     */
    private static expectSpecificSuccess;
    /**
     * Retrieves the status of Mojang's services.
     * The response is condensed into a single object. Each service is
     * a key, where the value is an object containing a status and name
     * property.
     *
     * Currently uses an in house daily ping. A daily ping is not super useful,
     * so this may be refactored at a later date. The feature was originally
     * built on Mojang's status API which has since been removed.
     *
     * @see https://wiki.vg/Mojang_API#API_Status_.28Removed.29
     */
    static status(): Promise<MojangResponse<MojangStatus[]>>;
    /**
     * Authenticate a user with their Mojang credentials.
     *
     * @param {string} username The user's username, this is often an email.
     * @param {string} password The user's password.
     * @param {string} clientToken The launcher's Client Token.
     * @param {boolean} requestUser Optional. Adds user object to the reponse.
     * @param {Object} agent Optional. Provided by default. Adds user info to the response.
     *
     * @see http://wiki.vg/Authentication#Authenticate
     */
    static authenticate(username: string, password: string, clientToken: string | null, requestUser?: boolean, agent?: Agent): Promise<MojangResponse<Session | null>>;
    /**
     * Validate an access token. This should always be done before launching.
     * The client token should match the one used to create the access token.
     *
     * @param {string} accessToken The access token to validate.
     * @param {string} clientToken The launcher's client token.
     *
     * @see http://wiki.vg/Authentication#Validate
     */
    static validate(accessToken: string, clientToken: string): Promise<MojangResponse<boolean>>;
    /**
     * Invalidates an access token. The clientToken must match the
     * token used to create the provided accessToken.
     *
     * @param {string} accessToken The access token to invalidate.
     * @param {string} clientToken The launcher's client token.
     *
     * @see http://wiki.vg/Authentication#Invalidate
     */
    static invalidate(accessToken: string, clientToken: string): Promise<MojangResponse<undefined>>;
    /**
     * Refresh a user's authentication. This should be used to keep a user logged
     * in without asking them for their credentials again. A new access token will
     * be generated using a recent invalid access token. See Wiki for more info.
     *
     * @param {string} accessToken The old access token.
     * @param {string} clientToken The launcher's client token.
     * @param {boolean} requestUser Optional. Adds user object to the reponse.
     *
     * @see http://wiki.vg/Authentication#Refresh
     */
    static refresh(accessToken: string, clientToken: string, requestUser?: boolean): Promise<MojangResponse<Session | null>>;
}

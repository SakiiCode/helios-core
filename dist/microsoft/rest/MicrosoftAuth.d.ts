import { MicrosoftResponse } from './MicrosoftResponse';
/**
 * Common properties for a request to Microsoft's OAuth endpoint.
 */
export interface AbstractTokenRequest {
    client_id: string;
    scope: string;
    redirect_uri: string;
}
/**
 * Request body for getting a Microsoft OAuth Access Token from
 * an authorization code.
 */
export interface AuthTokenRequest extends AbstractTokenRequest {
    grant_type: 'authorization_code';
    code: string;
}
/**
 * Request body for getting a Microsoft OAuth Access Token by refreshing
 * an existing token.
 */
export interface RefreshTokenRequest extends AbstractTokenRequest {
    grant_type: 'refresh_token';
    refresh_token: string;
}
/**
 * Microsoft OAuth Response.
 */
export interface AuthorizationTokenResponse {
    token_type: string;
    expires_in: number;
    scope: string;
    access_token: string;
    refresh_token: string;
    user_id: string;
    foci: string;
}
/**
 * Xbox Live Response.
 */
export interface XboxServiceTokenResponse {
    IssueInstant: string;
    NotAfter: string;
    Token: string;
    DisplayClaims: DisplayClaim;
}
export interface DisplayClaim {
    xui: {
        uhs: string;
    }[];
}
/**
 * Minecraft Authorization Response.
 */
export interface MCTokenResponse {
    username: string;
    roles: unknown[];
    access_token: string;
    token_type: string;
    expires_in: number;
}
/**
 * Minecraft Profile Response.
 */
export interface MCUserInfo {
    id: string;
    name: string;
    skins: MCSkinInfo[];
    capes: MCCapeInfo[];
}
export declare enum MCInfoState {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}
export interface MCInfo {
    id: string;
    state: MCInfoState;
    url: string;
}
export interface MCSkinInfo extends MCInfo {
    variant: string;
    alias: string;
}
export interface MCCapeInfo extends MCInfo {
    alias: string;
}
export declare class MicrosoftAuth {
    private static readonly logger;
    private static readonly TIMEOUT;
    static readonly TOKEN_ENDPOINT = "https://login.microsoftonline.com/consumers/oauth2/v2.0/token";
    static readonly XBL_AUTH_ENDPOINT = "https://user.auth.xboxlive.com/user/authenticate";
    static readonly XSTS_AUTH_ENDPOINT = "https://xsts.auth.xboxlive.com/xsts/authorize";
    static readonly MC_AUTH_ENDPOINT = "https://api.minecraftservices.com/authentication/login_with_xbox";
    static readonly MC_ENTITLEMENT_ENDPOINT = "https://api.minecraftservices.com/entitlements/mcstore";
    static readonly MC_PROFILE_ENDPOINT = "https://api.minecraftservices.com/minecraft/profile";
    private static readonly STANDARD_HEADERS;
    /**
     * MicrosoftAuthAPI implementation of handleGotError. This function will additionally
     * analyze the response from Microsoft and populate the microsoft-specific error information.
     *
     * @param operation The operation name, for logging purposes.
     * @param error The error that occurred.
     * @param dataProvider A function to provide a response body.
     * @returns A MicrosoftResponse configured with error information.
     */
    private static handleGotError;
    /**
     * Acquire a Microsoft Access Token, either for the first time or through refreshing an existing token.
     *
     * @param code Authorization Code or Refresh Token
     * @param refresh True if this is a refresh, false otherwise.
     * @param clientId The Azure Application (client) ID.
     * @returns A MicrosoftResponse for this operation.
     *
     * @see https://wiki.vg/Microsoft_Authentication_Scheme#Authorization_Code_-.3E_Authorization_Token
     * @see https://wiki.vg/Microsoft_Authentication_Scheme#Refreshing_Tokens
     */
    static getAccessToken(code: string, refresh: boolean, clientId: string): Promise<MicrosoftResponse<AuthorizationTokenResponse | null>>;
    /**
     * Authenticate with Xbox Live with a Microsoft Access Token.
     *
     * @param accessToken A Microsoft Access Token, from getAccessToken.
     * @returns A MicrosoftResponse for this operation.
     *
     * @see https://wiki.vg/Microsoft_Authentication_Scheme#Authenticate_with_XBL
     */
    static getXBLToken(accessToken: string): Promise<MicrosoftResponse<XboxServiceTokenResponse | null>>;
    /**
     * Acquire an Xbox Secure Token Service (XSTS) Token.
     *
     * @param xblResponse An Xbox Live token response, from getXBLToken.
     * @returns A MicrosoftResponse for this operation.
     *
     * @see https://wiki.vg/Microsoft_Authentication_Scheme#Authenticate_with_XSTS
     */
    static getXSTSToken(xblResponse: XboxServiceTokenResponse): Promise<MicrosoftResponse<XboxServiceTokenResponse | null>>;
    /**
     * Authenticate with Minecraft.
     *
     * @param xstsResponse An Xbox Secure Token Service (XSTS) Token response, from getXSTSToken.
     * @returns A MicrosoftResponse for this operation.
     *
     * @see https://wiki.vg/Microsoft_Authentication_Scheme#Authenticate_with_Minecraft
     */
    static getMCAccessToken(xstsResponse: XboxServiceTokenResponse): Promise<MicrosoftResponse<MCTokenResponse | null>>;
    /**
     * Get MC Profile Data, specifically account name and uuid.
     *
     * @param mcAccessToken A Minecraft Access Token, from getMCAccessToken.
     * @returns A MicrosoftResponse for this operation.
     *
     * @see https://wiki.vg/Microsoft_Authentication_Scheme#Get_the_profile
     */
    static getMCProfile(mcAccessToken: string): Promise<MicrosoftResponse<MCUserInfo | null>>;
}

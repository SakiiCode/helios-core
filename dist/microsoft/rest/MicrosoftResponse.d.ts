import { DisplayableError, RestResponse } from '../../common/rest/RestResponse';
/**
 * Various error codes from any point of the Microsoft authentication process.
 */
export declare enum MicrosoftErrorCode {
    /**
     * Unknown Error
     */
    UNKNOWN = 0,
    /**
     * Profile Error
     *
     * Account has not set up a minecraft profile or does not own the game.
     *
     * Note that Xbox Game Pass users who haven't logged into the new Minecraft
     * Launcher at least once will not return a profile, and will need to login
     * once after activating Xbox Game Pass to setup their Minecraft username.
     *
     * @see https://wiki.vg/Microsoft_Authentication_Scheme#Get_the_profile
     */
    NO_PROFILE = 1,
    /**
     * XSTS Error
     *
     * The account doesn't have an Xbox account. Once they sign up for one
     * (or login through minecraft.net to create one) then they can proceed
     * with the login. This shouldn't happen with accounts that have purchased
     * Minecraft with a Microsoft account, as they would've already gone
     * through that Xbox signup process.
     *
     * @see https://wiki.vg/Microsoft_Authentication_Scheme#Authenticate_with_XSTS
     */
    NO_XBOX_ACCOUNT = 2148916233,
    /**
     * XSTS Error
     *
     * The account is from a country where Xbox Live is not available/banned.
     *
     * @see https://wiki.vg/Microsoft_Authentication_Scheme#Authenticate_with_XSTS
     */
    XBL_BANNED = 2148916235,
    /**
     * XSTS Error
     *
     * The account is a child (under 18) and cannot proceed unless the account
     * is added to a Family by an adult. This only seems to occur when using a
     * custom Microsoft Azure application. When using the Minecraft launchers
     * client id, this doesn't trigger.
     *
     * @see https://wiki.vg/Microsoft_Authentication_Scheme#Authenticate_with_XSTS
     */
    UNDER_18 = 2148916238
}
export declare function microsoftErrorDisplayable(errorCode: MicrosoftErrorCode): DisplayableError;
export interface MicrosoftResponse<T> extends RestResponse<T> {
    microsoftErrorCode?: MicrosoftErrorCode;
}
/**
 * Resolve the error response code from the response body.
 *
 * @param body The microsoft error body response.
 */
export declare function decipherErrorCode(body: any): MicrosoftErrorCode;

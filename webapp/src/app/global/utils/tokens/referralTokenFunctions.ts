/**
 * A class containing functionality to work with referral links
 */
export class ReferralTokenFunctions {
  /**
   * Create a user referral link
   * @param token The referral token from the backend
   * @param utm_source Should pass 'referral',
   * @param utm_medium Should pass 'link'
   * @param utm_term Should pass encodeURI() on the user's name
   */
  static createReferralLink(
    token: string,
    utm_source: string,
    utm_medium: string,
    utm_term: string
  ): string {
    return `${window.location.protocol}//${window.location.hostname}/refer/${token}?utm_source=${utm_source}&utm_medium=${utm_medium}&utm_term=${utm_term}`;
  }
}

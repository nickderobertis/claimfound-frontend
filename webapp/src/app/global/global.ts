/**
 * A file containing global settings used throughout the application.
 */

export const GlobalCSSArray = ["garbage", "app/global/css/webflow.scss"];

//export const serverURL = 'http://127.0.0.1:5000/';

declare var serverUrl: string;
export const serverURL = serverUrl;

// List of backend routes which if send error, should not redirect to login
// i.e. all backend routes other than the ones that are listed here, if they
// send back an error, the user will be rerouted to login
// NOTE: do not include leading slash
export const unsecuredRoutes = [
  "log",
  "newuser",
  "verify",
  "reset",
  "forgot",
  "namecheck",
  "credits",
  "supported-states",
  "referrals/email",
  "map/overview",
  "map/point",
  "map/points",
  "maps/locations",
];

export const expectedException = [
  "incorrectLogin",
  "userNotVerified",
  "invalidToken",
  "incorrectPassword",
  "userDoesNotExist",
  "incorrectOldPassword",
  "invalidNonce",
  "emailFormat",
  "cannotAddClaimsException",
  "nameSearchInputException",
  "maxFileSizeLimit",
  "locationNotSupported",
];

export const noErrorModalRoutes = [
  "/acknowledgements",
  "/dashboard/account",
  "/login",
];

// Array of RegExp patterns to remove key pairs from logged objects
// remove passwords
// remove doc property from documents/add and documents/delete requests as is too large to send to rollbar
export const defaultIgnoredProperties = [/password/i, /^doc$/i];

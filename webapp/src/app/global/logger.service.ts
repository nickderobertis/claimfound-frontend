import { Injectable } from "@angular/core";
import { defaultIgnoredProperties } from "./global";

declare var logger: any; //pull log instance from log4javascript. See index.html
declare var productionLogging: boolean; // true to log user details. See index.html

/**
 * The service which enables logging throughout the application.
 *
 * The main external logging functions are through the LoggerService and the [@log]{@link log} decorator.
 * However the main logic lies in [logAtLevel]{@link logAtLevel}.
 */
@Injectable()
export class LoggerService {
  trace(...args: any[]) {
    let levelStr = "trace";
    return logAtLevel(levelStr, ...args);
  }

  debug(...args: any[]) {
    let levelStr = "debug";
    return logAtLevel(levelStr, ...args);
  }

  info(...args: any[]) {
    let levelStr = "info";
    return logAtLevel(levelStr, ...args);
  }

  warn(...args: any[]) {
    let levelStr = "warn";
    return logAtLevel(levelStr, ...args);
  }

  error(...args: any[]) {
    let levelStr = "error";
    return logAtLevel(levelStr, ...args);
  }

  fatal(...args: any[]) {
    let levelStr = "fatal";
    return logAtLevel(levelStr, ...args);
  }

  removeIgnoredProperties(obj: Object, ignoredProperties?: RegExp[]) {
    return removeIgnoredProperties(obj, ignoredProperties);
  }
}

// This is the main logging logic. All logs from both service and decorator flow through this function
export function logAtLevel(level: string, ...args: any[]) {
  // Add additional details about the user in production logging
  args = addUserDetails(args);

  // Convert strings to methods of log4javascript logger
  level = level.toLowerCase();
  if (level == "trace") {
    return logger.trace(...args);
  }
  if (level == "debug") {
    return logger.debug(...args);
  }
  if (level == "info") {
    return logger.info(...args);
  }
  if (level == "warn") {
    return logger.warn(...args);
  }
  if (level == "error") {
    return logger.error(...args);
  }
  if (level == "fatal") {
    return logger.fatal(...args);
  }
}

// Uses RegExp patterns to remove key pairs from logged objects
// Note: not inplace. Returns a modified copy of the original object.
function removeIgnoredProperties(
  obj: Object,
  ignoredProperties?: RegExp[],
  removeDefault?: boolean
) {
  if (!obj) {
    return obj;
  }

  var objCopy = JSON.parse(JSON.stringify(obj));

  // Add defaults from global.ts to any passed patterns to remove
  removeDefault = removeDefault || true;
  if (removeDefault) {
    ignoredProperties = concatArraysIfDefined(
      ignoredProperties,
      defaultIgnoredProperties
    );
  }

  for (var i = 0; i < ignoredProperties.length; i++) {
    let key = ignoredProperties[i];
    // Ensure object type before removing properties
    if (typeof objCopy === "object") {
      removeProperties(objCopy, key);
    }
  }

  return objCopy;
}

// This will remove the property from all the levels in the object recursively
function removeProperties(obj: Object, propToDelete: RegExp) {
  if (!propToDelete) {
    return;
  }

  for (var property in obj) {
    if (obj.hasOwnProperty(property)) {
      if (typeof obj[property] == "object") {
        removeProperties(obj[property], propToDelete);
      }
      if (typeof obj[property] == "string") {
        if (propToDelete.test(property)) {
          obj[property] = "redacted";
        }
      }
    }
  }
}

function concatArraysIfDefined(...arrs: any[]) {
  var fullArr = [];
  for (let index in arrs) {
    var arr = arrs[index];
    if (typeof arr != "undefined") {
      fullArr = fullArr.concat(arr);
    }
  }

  return fullArr;
}

function getUserDetails() {
  return new UserDetails(
    navigator.userAgent,
    navigator.platform,
    window.location.pathname,
    JSON.stringify(localStorage)
  );
}

//This is the base function to be called by decorator
//Any future modifications should be made here and not in the
//decorator because the decorator is only applied to the methods
//of the LoggerService class and not to the log decorator
function addUserDetails(args: any[]) {
  if (productionLogging) {
    return args.concat(getUserDetails());
  } else {
    return args;
  }
}

//A logging decorator which logs entry and exit from functions
export function log(
  level?: string,
  removeProperties?: RegExp[],
  removeDefaultProperties?: boolean
) {
  //Set defaults
  level = level || "debug";
  removeDefaultProperties = removeDefaultProperties || true;

  return function _log(target: any, key: string, value: any) {
    return {
      value: function(...args: any[]) {
        // Remove ignored properties from incoming values
        var a = args
          .map(a =>
            removeIgnoredProperties(
              a,
              removeProperties,
              removeDefaultProperties
            )
          )
          .map(a => JSON.stringify(a))
          .join();
        var result = value.value.apply(this, args);
        // Remove ignored properties from result as well
        var r = JSON.stringify(
          removeIgnoredProperties(
            result,
            removeProperties,
            removeDefaultProperties
          )
        );
        logAtLevel(level, `Call: ${key}(${a}) => ${r}`);
        return result;
      }
    };
  };
}

class UserDetails {
  constructor(
    public userAgent: string,
    public platform: string,
    public pageOn: string,
    public localStorage: string
  ) {}
}

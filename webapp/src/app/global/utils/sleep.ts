/**
 * Creates a promise after an asynchronous sleep.
 *
 * Typically used to perform a callback after an asynchronous sleep
 * @param milliseconds Number of milliseconds to wait befre
 * @example
 * sleep(1000).then(() => {
 *     myFunc();
 * });
 */
export const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

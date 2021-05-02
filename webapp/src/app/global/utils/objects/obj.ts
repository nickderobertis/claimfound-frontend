/**
 * Checks whether the passed object is empty
 */
export function isEmptyObj(obj: Object): boolean {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

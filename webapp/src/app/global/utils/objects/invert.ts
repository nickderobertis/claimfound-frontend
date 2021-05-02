/**
 * Inverts an object's keys and values
 *
 * ## Examples:
 * ```typescript
let myObj = {
 a: "b",
 c: "d"
};
invert(myobj);
// returns { b: "a", d: "c" }```
 *
 *
 * @param obj Any object
 *
 */
export function invert(obj) {
  let new_obj = {};
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      new_obj[obj[prop]] = prop;
    }
  }
  return new_obj;
}

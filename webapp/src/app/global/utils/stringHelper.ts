/**
 * A version of JSON.stringify which won't raise an error. If it encounters an error, it will return that as a
 * string rather than raising it.
 */
export function stringify(obj: any): string {
    try {
      return JSON.stringify(obj);
    } catch (e) {
      let error = e.toString();
      return "FAILED STRINGIFY: " + e;
    }
}


/**
 * Removes the last three characters of a string and replaces them with '...' if the string exceeds length.
 */
export function taperString(s: string, length: number) {
    if(s.length > length) {
        s = s.substr(0, length - 3);
        s = s + "...";
    }
    return s;
}
/**
 * Converts a string to titlecase, e.g. "this guy" to "This Guy"
 */
export function toTitleCase(str: string): string {
  return str.toLowerCase().replace(/(?:^|[\s-/])\w/g, (match: string) => {
    return match.toUpperCase();
  });
}

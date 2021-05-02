export function displayStyleFromBoolean(
  shouldDisplay: boolean
): { [s: string]: string } {
  if (shouldDisplay) {
    return {};
  } else {
    return { display: "none" };
  }
}

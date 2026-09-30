export const MIN_LOADER_MS = 1500;

export function waitMinLoader(startTime) {
  const elapsed = Date.now() - startTime;
  const remaining = Math.max(0, MIN_LOADER_MS - elapsed);
  return new Promise((resolve) => setTimeout(resolve, remaining));
}

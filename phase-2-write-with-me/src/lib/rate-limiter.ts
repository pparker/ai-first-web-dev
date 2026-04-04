export function isRateLimited(
  ip: string,
  log: Map<string, number[]>,
  now: number,
  limit = 5,
  windowMs = 60_000
): boolean {
  const cutoff = now - windowMs;
  const timestamps = (log.get(ip) ?? []).filter((t) => t > cutoff);

  if (timestamps.length >= limit) {
    log.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  log.set(ip, timestamps);
  return false;
}

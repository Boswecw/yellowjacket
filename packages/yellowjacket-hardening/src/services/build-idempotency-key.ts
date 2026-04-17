export function buildIdempotencyKey(parts: string[]): string {
  if (parts.length === 0) {
    throw new Error("idempotency key requires at least one part");
  }

  const normalized = parts.map((part) => part.trim()).filter((part) => part.length > 0);

  if (normalized.length === 0) {
    throw new Error("idempotency key parts may not be blank");
  }

  return `yj:${normalized.join(":")}`;
}

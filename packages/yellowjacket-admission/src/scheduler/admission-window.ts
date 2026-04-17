export function isScheduleOpen(
  nowIso: string,
  notBeforeAt?: string,
  expiresAt?: string,
): boolean {
  const now = Date.parse(nowIso);

  if (Number.isNaN(now)) {
    throw new Error("invalid now timestamp");
  }

  if (notBeforeAt) {
    const notBefore = Date.parse(notBeforeAt);

    if (Number.isNaN(notBefore)) {
      throw new Error("invalid notBeforeAt timestamp");
    }

    if (now < notBefore) {
      return false;
    }
  }

  if (expiresAt) {
    const expires = Date.parse(expiresAt);

    if (Number.isNaN(expires)) {
      throw new Error("invalid expiresAt timestamp");
    }

    if (now > expires) {
      return false;
    }
  }

  return true;
}

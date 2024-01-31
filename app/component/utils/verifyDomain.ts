export function verifyDomain(request: Request) {
  const referer = request.headers.get("Referer");
  if (!referer) return false;
  const allowedDomains: string = process.env.ORIGIN;
  const isDomainAllowed = referer?.startsWith(allowedDomains);
  return isDomainAllowed;
}

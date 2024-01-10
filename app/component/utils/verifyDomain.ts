export function verifyDomain(request: Request) {
  const referer = request.headers.get("Referer");
  const allowedDomains = [
    "https://monlam.ai",
    "http://localhost:3000",
    "https://staging.monlam.ai",
  ];

  const isDomainAllowed = allowedDomains.some((domain) =>
    referer?.startsWith(domain)
  );
  return { referer, isDomainAllowed };
}

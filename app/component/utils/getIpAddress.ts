function getIpAddressByRequest(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip =
    forwarded ||
    request.headers.get("x-real-ip") ||
    request.socket?.remoteAddress ||
    "IP not available";
  return ip;
}
export default getIpAddressByRequest;

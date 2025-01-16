import getIpAddressByRequest from "~/component/utils/getIpAddress";

export const getHeaders = async (request: Request, user?: any) => {
  const AccessKey = process.env?.API_ACCESS_KEY;
  let ip = getIpAddressByRequest(request);
  // Base headers
  let headers: Record<string, string> = {
    Accept: "application/json",
    Authorization: AccessKey,
    Origin: "https://monlam.ai",
    "Content-Type": "application/json",
    "Client-IP": ip,
  };
  if (user) {
    headers["Cookie"] = `email=${user.emails[0].value};`;
  }

  return headers;
};
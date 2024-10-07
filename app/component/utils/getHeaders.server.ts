import getIpAddressByRequest from "~/component/utils/getIpAddress";

export const getHeaders = async (request: Request, token?: string) => {
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

  // If a token is passed, add it as a cookie
  if (token) {
    headers["Cookie"] = `id_token=${token};`;
  }

  return headers;
};
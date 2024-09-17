import getIpAddressByRequest from "~/component/utils/getIpAddress";

export const getHeaders = async (request: Request) => {
  const AccessKey = process.env?.API_ACCESS_KEY;
  let ip = getIpAddressByRequest(request);

  return {
    Accept: "application/json",
    Authorization: AccessKey,
    Origin: "https://monlam.ai",
    "Content-Type": "application/json",
    "Client-IP": ip,
  };
};

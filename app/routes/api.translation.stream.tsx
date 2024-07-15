import { LoaderFunctionArgs } from "@remix-run/node";
import { sessionStorage, verify_token } from "~/services/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  let url = new URL(request.url);
  let text = url.searchParams.get("text") as string;
  let target = url.searchParams.get("target") as string;
  let csrfToken = url.searchParams.get("token") as string;
  let token_server = await verify_token(csrfToken);
  if (!token_server) {
    return new Response("Invalid token", { status: 403 });
  }

  const controller = new AbortController();
  const formData = new FormData();
  const fileUploadUrl = process.env?.FILE_SUBMIT_URL;
  let api_url = fileUploadUrl + "/mt/playground/stream";
  const AccessKey = process.env?.API_ACCESS_KEY;
  formData.append("input", text);
  formData.append("direction", target);
  return fetch(api_url, {
    method: "POST",
    body: formData,
    headers: {
      "x-api-key": AccessKey!, // Replace with your actual access key
    },
    signal: controller.signal,
  });
}

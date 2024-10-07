import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { destroySession, getUserSession } from "~/services/session.server";


export const action: ActionFunction = async ({ request }) => {
  let clientId = process.env.AUTH0_CLIENT_ID as string;
  let domain = process.env.AUTH0_DOMAIN as string;
  let requestUrl = new URL(request.url);

  const session = await getUserSession(request);

  let redirect_url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://" + (requestUrl.hostname as string);

  let url = `https://${domain}/v2/logout`;
  const logoutURL = new URL(url);
  logoutURL.searchParams.set("client_id", clientId);
  logoutURL.searchParams.set("returnTo", redirect_url);
  return redirect(logoutURL.toString(), {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};

export const loader: LoaderFunction = action;

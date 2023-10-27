import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { destroySession, getUserSession } from "~/services/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  return redirect("/");
};

export const action: ActionFunction = async ({ request }) => {
  const session = await getUserSession(request);
  let domain = process.env.AUTH0_DOMAIN as string;
  let requestUrl = new URL(request.url);

  let redirect_url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://" + (requestUrl.hostname as string);

  let clientId = process.env.AUTH0_CLIENT_ID as string;

  let url = `https://${domain}/v2/logout?client_id=${clientId}&returnTo=${redirect_url}`;

  return redirect(url, {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};

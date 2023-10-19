import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { destroySession, getUserSession } from "~/services/session.server";

export const action: ActionFunction = async ({ request }) => {
  const session = await getUserSession(request);

  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};

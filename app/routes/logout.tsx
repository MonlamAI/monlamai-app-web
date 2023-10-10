// app/routes/app/auth0/logout.tsx
import { redirect, type LoaderFunction } from "@remix-run/node";
import { destroySession, getSession } from "~/services/session.server";

// Here we use the logout function of the authenticator to logout the user and clear the Auth0 session.
export const loader: LoaderFunction = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie"));

  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};

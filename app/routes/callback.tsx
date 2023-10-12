import {
  type ActionFunction,
  type LoaderFunction,
  redirect,
} from "@remix-run/node";
import { useLoaderData, useLocation } from "@remix-run/react";
import React, { useEffect } from "react";
import { useAuth0 } from "~/component/hooks/useAuth";
import { db } from "~/services/db.server";
import { commitSession, getSession } from "~/services/session.server";
export const loader: LoaderFunction = async ({ request }) => {
  let { AUTH0_DOMAIN, AUTH0_CLIENT_ID } = process.env;
  return { AUTH0_DOMAIN, AUTH0_CLIENT_ID };
};

export const action: ActionFunction = async ({ request }) => {
  let formdata = await request.formData();
  const userValue = formdata.get("user") as string;
  let user = JSON.parse(userValue);
  let session = await getSession(request.headers.get("Cookie"));
  if (user) {
    const userdata = await db.user.upsert({
      where: {
        email: user.email,
      },
      create: {
        picture: user.picture,
        username: user.name,
        email: user.email,
      },
      update: {
        picture: user.picture,
        username: user.name,
        email: user.email,
      },
    });
    console.log("userdata", userdata);
    session.set("user", user);
    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
  return null;
};

function callback() {
  let { AUTH0_DOMAIN, AUTH0_CLIENT_ID } = useLoaderData();
  let location = useLocation();
  const auth0Config = {
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    redirectUri: location + "callback",
    responseType: "token id_token",
  };
  let { handleAuthentication } = useAuth0(auth0Config);

  const startAuth = async () => {
    await handleAuthentication();
  };

  useEffect(() => {
    startAuth();
  }, []);
  return <div>redirecting ...</div>;
}

export default callback;

import { Authenticator } from "remix-auth";
import type { Auth0Profile } from "remix-auth-auth0";
import { Auth0Strategy } from "remix-auth-auth0";
import { sessionStorage } from "./session.server";
import { db } from "./db.server";

let { AUTH0_CALLBACK_URL, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_DOMAIN } =
  process.env;

export const auth = new Authenticator<Auth0Profile>(sessionStorage);

const auth0Strategy = new Auth0Strategy(
  {
    callbackURL: AUTH0_CALLBACK_URL!,
    clientID: AUTH0_CLIENT_ID!,
    clientSecret: AUTH0_CLIENT_SECRET!,
    domain: AUTH0_DOMAIN!,
    scope: "openid profile email",
  },
  async (data) => {
    let { profile, extraParams } = data;
    // Use the returned information to process or write to the DB.
    //
    let id_token = extraParams?.id_token;
    let email = profile?._json?.email;
    let picture = profile?._json?.picture;
    let username = profile?._json?.given_name;
    return { id_token, ...profile };
  }
);
auth.use(auth0Strategy);

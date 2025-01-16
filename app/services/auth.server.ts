import { Authenticator } from "remix-auth";
import type { Auth0Profile } from "remix-auth-auth0";
import { Auth0Strategy } from "remix-auth-auth0";
import { sessionStorage } from "./session.server";
import { db } from "./db.server";





let { AUTH0_CALLBACK_URL, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_DOMAIN } =
  process.env;


// Create an instance of the authenticator, pass a generic with what your
// strategies will return and will be stored in the session
export const auth = new Authenticator<User>(sessionStorage);

let auth0Strategy = new Auth0Strategy(
  {
    callbackURL: AUTH0_CALLBACK_URL,
    clientID: AUTH0_CLIENT_ID,
    clientSecret: AUTH0_CLIENT_SECRET,
    domain: AUTH0_DOMAIN,
  },
  async ({ accessToken, refreshToken, extraParams, profile}) => {
        const id_token = extraParams?.id_token;
        const expires_on= parseJwt(id_token);
        const email = profile?._json?.email;
        const picture = profile?._json?.picture;
        const username = profile?._json?.given_name;
        if(isTokenExpired(expires_on)) console.log('token expired')
        return { id_token,expires_on, ...profile };
  },
);
auth.use(auth0Strategy);

export function isTokenExpired(expirationTime: number): boolean {
  return Date.now() >= expirationTime * 1000;
}

function parseJwt(token) {
  try {
    const [, payloadBase64] = token.split('.');
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);
    return payload.exp;
  } catch (e) {
    return null;
  }
}
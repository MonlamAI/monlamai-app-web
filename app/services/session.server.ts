import { createCookieSessionStorage } from "@remix-run/node";
import { getUser } from "~/modal/user.server";

// export the whole sessionStorage object

function getDate() {
  const expires = new Date();
  expires.setDate(expires.getDate() + 7);
  return expires;
}

export let sessionStorage = createCookieSessionStorage({
  cookie: {
    expires: getDate(),
    name: "_session_monlam", // use any name you want here
    sameSite: "lax", // this helps with CSRF
    path: "/", // remember to add this so the cookie will work in all routes
    httpOnly: true, // for security reasons, make this cookie http only
    secrets: ["seecreet"], // replace this with an actual secret
    secure: process.env.NODE_ENV === "production", // enable this in prod only
  },
});

// you can also export the methods individually for your own usage
export async function getUserSession(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  let user = session.get("user");
  return user;
}

export async function getUserDetail(request: Request) {
  let userdata = await getUserSession(request);
  let user = null;
  if (userdata) {
    user = await getUser(userdata?._json.email);
  }
  return user;
}

export async function generateCSRFToken(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  let csrfToken = session.get("csrfToken");
  let storedCsrfTokenExpiry = session.get("csrfTokenExpiry");
  if (!csrfToken || !storedCsrfTokenExpiry) {
    csrfToken = generateCsrfToken();
    storedCsrfTokenExpiry = generateCsrfTokenExpiry();
    return { csrfToken, storedCsrfTokenExpiry };
  }
  const now = new Date();
  const tokenExpiry = new Date(storedCsrfTokenExpiry);
  if (now > tokenExpiry) {
    csrfToken = generateCsrfToken();
    storedCsrfTokenExpiry = generateCsrfTokenExpiry();
    return { csrfToken, storedCsrfTokenExpiry };
  }

  return { csrfToken, storedCsrfTokenExpiry };
}

function generateCsrfToken() {
  return require("crypto").randomBytes(32).toString("hex");
}
function generateCsrfTokenExpiry() {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 30); // Token expires in 30 minutes
  return now.toISOString();
}

export let { getSession, commitSession, destroySession } = sessionStorage;

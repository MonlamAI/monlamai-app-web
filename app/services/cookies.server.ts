import { createCookie } from "@remix-run/node";

export const userPrefs = createCookie("user-prefs", {
  maxAge: 3600, // one hour
  httpOnly: true,
  sameSite: "strict",
  secure: process.env.NODE_ENV === "production",
  secrets: [process.env?.COOKIE_SECRET!],
});

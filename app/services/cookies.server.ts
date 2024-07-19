import { createCookie } from "@remix-run/node";

export const userPrefs = createCookie("user-prefs", {
  maxAge: 86_400, // one day
  httpOnly: true,
  sameSite: "strict",
  secure: process.env.NODE_ENV === "production",
});

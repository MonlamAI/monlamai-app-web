import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { defer, redirect } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
  useSearchParams,
} from "@remix-run/react";
import Footer from "./component/Footer";
import Header from "./component/Header";
import globalStyle from "./styles/global.css";
import tailwindStyle from "./styles/tailwind.css";

import { getUserSession } from "~/services/session.server";
import { getUser } from "./modal/user";
import { auth } from "./services/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  let userdata = await getUserSession(request);
  if (!userdata) return { user: null };
  let user = await getUser(userdata?._json?.email);
  return defer({
    user,
  });
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindStyle },
  { rel: "stylesheet", href: globalStyle },
];

function Document({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.0.8/css/all.css"
          integrity="sha384-3AB7yXWz4OeoZcPbieVW64vVXEwADiYyAEhwilzWsLw+9FgqpyjjStpPnpBO8o8S"
          crossOrigin="anonymous"
        />
        <Meta />
        <Links />
      </head>
      <body className="inset-0 overflow-y-auto overflow-x-hidden">
        {children}
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
        <ScrollRestoration />
      </body>
    </html>
  );
}

export default function App() {
  let { user } = useLoaderData();
  let location = useLocation();

  let isSteps = location.pathname.includes("steps");
  return (
    <Document>
      {user && <Header />}
      <Outlet />
      {user && !isSteps && <Footer />}
    </Document>
  );
}

export function ErrorBoundary({ error }) {
  console.error(error);
  return (
    <Document>
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <Link to="/" className=" text-red-500 font-bold">
        home page
      </Link>
      , if error persist please contact
      {error}
    </Document>
  );
}

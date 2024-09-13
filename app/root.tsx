import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import type {
  LinksFunction,
  LoaderFunction,
  HeadersArgs,
  ActionFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import Footer from "./component/layout/Footer";
import Header from "./component/layout/Header";
import globalStyle from "./styles/global.css";
import tailwindStyle from "./styles/tailwind.css";
import { LitteraProvider } from "@assembless/react-littera";
import toastStyle from "react-toastify/dist/ReactToastify.css";
import feedBucketStyle from "~/styles/feedbucket.css";
import { ToastContainer } from "react-toastify";
import FeedBucket from "./component/FeedBucket";
import LocationComponent from "./component/LocationDetect";
import { ErrorPage } from "./component/ErrorPages";
import {
  themeSessionResolver,
  generateCSRFToken,
  getUserSession,
} from "~/services/session.server";
import { AppInstaller } from "~/component/AppInstaller.client";
import { ClientOnly } from "remix-utils/client-only";
import { getUser } from "~/modal/user.server";
import { userPrefs } from "~/services/cookies.server";
import {
  ThemeProvider,
  useTheme,
  PreventFlashOnWrongTheme,
} from "remix-themes";
import Maintenance from "./component/Maintenance";

export const loader: LoaderFunction = async ({ request, context }) => {
  let userdata = await getUserSession(request);
  const feedBucketAccess = process.env.FEEDBUCKET_ACCESS;
  const feedbucketToken = process.env.FEEDBUCKET_TOKEN;
  let user = userdata ? await getUser(userdata?._json?.email) : null;
  const { getTheme } = await themeSessionResolver(request);
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await userPrefs.parse(cookieHeader)) || {};
  cookie.token = await generateCSRFToken(request, user);

  return json(
    {
      user,
      isJobEnabled: false,
      feedBucketAccess,
      feedbucketToken,
      AccessKey: process.env?.API_ACCESS_KEY,
      theme: getTheme(),
      IS_UNDER_MAINTENANCE: process.env?.IS_UNDER_MAINTENANCE,
    },
    {
      status: 200,
      headers: {
        "Set-Cookie": await userPrefs.serialize(cookie),
      },
    }
  );
};

export const headers = ({ loaderHeaders, parentHeaders }: HeadersArgs) => {
  return { "cache-control": loaderHeaders.get("cache-control") };
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindStyle },
  { rel: "stylesheet", href: globalStyle },
  { rel: "stylesheet", href: toastStyle },
  { rel: "stylesheet", href: feedBucketStyle },

  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/favicon-32x32.png",
  },
  {
    rel: "icon",
    type: "image/x-icon",
    href: "/favicon.ico",
  },
  { rel: "manifest", href: "/manifest.webmanifest" },
  { rel: "apple-touch-icon", href: "/favicon-32x32.png" },
];

export const meta: MetaFunction = () => {
  return [
    { title: "སྨོན་ལམ་རིག་ནུས། | Monlam AI | Tibetan Language AI Development" },
    {
      name: "description",
      content:
        "Create an account or log in to Monlam , users can seamlessly utilize four powerful models for translation, text-to-speech, speech-to-text, and OCR (Optical Character Recognition).",
    },
    {
      name: "keywords",
      content:
        "Monlam, AI , tibetan , dictionary ,translation ,orc , tts, stt ,login,སྨོན་ལམ་, རིག་ནུས། , tibetan to english, english to tibetan, tibetan dictionary, tibetan translation, tibetan ocr, tibetan tts, tibetan stt, tibetan login",
    },
    {
      name: "apple-mobile-web-app-status-bar",
      content: "#0757b5",
    },
    {
      "og:title":
        "སྨོན་ལམ་རིག་ནུས། | Monlam AI | Tibetan Language AI Development",
    },
    {
      "og:description":
        "Create an account or log in to Monlam , users can seamlessly utilize four powerful models for translation, text-to-speech, speech-to-text, and OCR (Optical Character Recognition).",
    },
  ];
};

function Document({ children, theme }: { children: React.ReactNode }) {
  const data = useLoaderData();
  return (
    <html lang="en" className={theme}>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />{" "}
        <link rel="apple-touch-icon" href="img/logo192web.png" />
        <link rel="apple-touch-startup-image" href="img/logo1280x720web.png" />
        <link rel="apple-touch-startup-image" href="img/logo720x1280web.png" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="mobile-web-app-capable" content="yes"></meta>
        <meta name="apple-mobile-web-app-title" content="Monlam Chat" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
        <Links />
      </head>
      <body className="flex h-[100dvh]  mx-auto inset-0 overflow-y-auto overflow-x-hidden dark:bg-slate-700 dark:text-gray-200">
        {children}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: "https://www.monlam.ai",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://www.monlam.ai/seo/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}

function App() {
  let { user, IS_UNDER_MAINTENANCE } = useLoaderData();
  const [theme] = useTheme();

  return (
    <Document theme={theme ?? ""}>
      <LitteraProvider locales={["en_US", "bo_TI"]}>
        <div className="flex flex-col flex-1 text-light_text-default dark:text-dark_text-secondary">
          <Header />
          <ClientOnly fallback={<div />}>{() => <AppInstaller />}</ClientOnly>
          {user && <LocationComponent />}

          <div className="flex-1 flex justify-center pt-4  bg-neutral-50 dark:bg-[--main-bg] ">
            <div className="flex-1 max-w-[1280px] px-2 ">
              {IS_UNDER_MAINTENANCE === "true" ? <Maintenance /> : null}
              <Outlet />
              <FeedBucket />
              {process.env.NODE_ENV === "development" && <LiveReload />}
            </div>
          </div>

          <Footer />
        </div>
        <Scripts />
        <ScrollRestoration />
      </LitteraProvider>
      <ToastContainer />
    </Document>
  );
}

export default function AppWithProviders() {
  const data = useLoaderData();
  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
      <App />
    </ThemeProvider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  // catch boundary errors
  if (isRouteErrorResponse(error)) {
    return (
      <Document>
        <ErrorPage error={error} />
      </Document>
    );
  }
  // if thrown errors
  return (
    <Document>
      <ErrorPage error={error} />
    </Document>
  );
}

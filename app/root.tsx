import type {
  LinksFunction,
  LoaderFunction,
  HeadersArgs,
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
import { getUserSession } from "~/services/session.server";
import { getUser } from "./modal/user.server";
import toastStyle from "react-toastify/dist/ReactToastify.css";
import feedBucketStyle from "~/styles/feedbucket.css";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import useLocalStorage from "./component/hooks/useLocaleStorage";
import FeedBucket from "./component/FeedBucket";
import LocationComponent from "./component/LocationDetect";
import unleash from "./services/features.server";

export const loader: LoaderFunction = async ({ request }) => {
  let userdata = await getUserSession(request);
  const feedBucketAccess = process.env.FEEDBUCKET_ACCESS;
  const feedbucketToken = process.env.FEEDBUCKET_TOKEN;

  const isJobEnabled = unleash.isEnabled("isJobEnabled");
  const enable_replacement_mt = unleash.isEnabled("enable_replacement_mt");
  return json(
    {
      user: userdata ? await getUser(userdata?._json?.email) : null,
      isJobEnabled: isJobEnabled ?? false,
      enable_replacement_mt: enable_replacement_mt ?? false,
      feedBucketAccess,
      feedbucketToken,
      AccessKey: process.env?.API_ACCESS_KEY,
    },
    { status: 200, headers: { "cache-control": "no-cache" } }
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
        "Monlam, AI , tibetan , dictionary ,translation ,orc , tts, stt ,login,སྨོན་ལམ་, རིག་ནུས།",
    },
  ];
};

function Document({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex h-[100dvh] max-w-[1280px] mx-auto inset-0 overflow-y-auto overflow-x-hidden dark:bg-slate-700 dark:text-gray-200">
        {children}
        <FeedBucket />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
        <ScrollRestoration />
        {/* {show_feed_bucket && show && <script dangerouslySetInnerHTML={{ __html: feedbucketScript }}></script>} */}
      </body>
    </html>
  );
}

export default function App() {
  let { user } = useLoaderData();
  let location = useLocation();
  let isSteps = location.pathname.includes("steps");
  let [isDarkMode, setIsDarkMode] = useLocalStorage("Darktheme", false);
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);
  let showHeader = !location.pathname.includes("/login");
  return (
    <Document>
      <LitteraProvider locales={["en_US", "bo_TI"]}>
        <div className="flex flex-col flex-1">
          {showHeader && <Header />}
          {user && <LocationComponent />}
          <div className="flex-1">
            <Outlet />
          </div>
          {!isSteps && showHeader && <Footer />}
        </div>
      </LitteraProvider>
      <ToastContainer />
    </Document>
  );
}

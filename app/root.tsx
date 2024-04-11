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
  useRouteLoaderData,
} from "@remix-run/react";
import Footer from "./component/layout/Footer";
import Header from "./component/layout/Header";
import globalStyle from "./styles/global.css";
import tailwindStyle from "./styles/tailwind.css";
import { LitteraProvider } from "@assembless/react-littera";
import { getUserSession } from "~/services/session.server";
import { getUser } from "./modal/user.server";
import toastStyle from "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import flagsmith_provider from "./services/features.server";
import { useEffect, useState } from "react";
import useLocalStorage from "./component/hooks/useLocaleStorage";
import FeedBucket from "./component/FeedBucket";
import LocationComponent from "./component/LocationDetect";

export const loader: LoaderFunction = async ({ request }) => {
  let userdata = await getUserSession(request);
  const feedBucketAccess = process.env.FEEDBUCKET_ACCESS;
  const feedbucketToken = process.env.FEEDBUCKET_TOKEN;
  let features: any = {};
  try {
    let flagsmithdata = await flagsmith_provider.getEnvironmentFlags();
    features = flagsmithdata.flags;
  } catch (e) {
    console.log("flagsmith not available without internet");
  }
  const isJobEnabled = features?.job_link?.enabled;
  const isFileUploadEnabled = features?.feat_file_upload?.enabled;
  const show_mt_language_toggle = features?.show_mt_language_toggle?.enabled;
  const show_feed_bucket = features?.show_feed_bucket?.enabled;
  const enable_ocr_model = features?.enable_ocr_model?.enabled;
  const enable_replacement_mt = features?.enable_replacement_mt?.enabled;
  return json(
    {
      user: userdata ? await getUser(userdata?._json?.email) : null,
      isJobEnabled: isJobEnabled || false,
      isFileUploadEnabled: isFileUploadEnabled || false,
      show_mt_language_toggle: show_mt_language_toggle || false,
      show_feed_bucket_to_all: show_feed_bucket || false,
      enable_ocr_model: enable_ocr_model || false,
      enable_replacement_mt: enable_replacement_mt || false,
      feedBucketAccess,
      feedbucketToken,
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
      <body className="flex h-[100dvh] inset-0 overflow-y-auto overflow-x-hidden dark:bg-slate-700 dark:text-gray-200">
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
  return (
    <Document>
      <LitteraProvider locales={["en_US", "bo_TI"]}>
        <div className="flex flex-col flex-1">
          {user && <Header />}
          {user && <LocationComponent />}
          <div className="flex-1">
            <Outlet />
          </div>
          {user && !isSteps && <Footer />}
        </div>
      </LitteraProvider>
      <ToastContainer />
    </Document>
  );
}

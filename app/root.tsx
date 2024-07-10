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
  useFetcher,
} from "@remix-run/react";
import Footer from "./component/layout/Footer";
import Header from "./component/layout/Header";
import globalStyle from "./styles/global.css";
import tailwindStyle from "./styles/tailwind.css";
import { LitteraProvider } from "@assembless/react-littera";
import { generateCSRFToken, getUserSession } from "~/services/session.server";
import { getUser } from "./modal/user.server";
import toastStyle from "react-toastify/dist/ReactToastify.css";
import feedBucketStyle from "~/styles/feedbucket.css";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import useLocalStorage from "./component/hooks/useLocaleStorage";
import FeedBucket from "./component/FeedBucket";
import LocationComponent from "./component/LocationDetect";
import unleash from "./services/features.server";

import { saveIpAddress } from "~/modal/log.server";
import getIpAddressByRequest from "~/component/utils/getIpAddress";
import { ErrorPage } from "./component/ErrorPages";
import { sessionStorage } from "~/services/session.server";
import { AppInstaller } from "~/component/AppInstaller.client";
import { ClientOnly } from "remix-utils/client-only";
import useDetectPWA from "~/component/hooks/useDetectPWA";
import { update_pwa } from "~/modal/user.server";
export const loader: LoaderFunction = async ({ request }) => {
  let userdata = await getUserSession(request);
  const feedBucketAccess = process.env.FEEDBUCKET_ACCESS;
  const feedbucketToken = process.env.FEEDBUCKET_TOKEN;
  let user = userdata ? await getUser(userdata?._json?.email) : null;
  const isJobEnabled = unleash.isEnabled("isJobEnabled");
  const enable_replacement_mt = unleash.isEnabled("enable_replacement_mt");
  const show_about_lama = unleash.isEnabled("show_about_lama");
  const file_upload_enable = unleash.isEnabled("file_upload_enable");

  const csrfToken = await generateCSRFToken(request);

  return json(
    {
      user,
      isJobEnabled: isJobEnabled ?? false,
      enable_replacement_mt: enable_replacement_mt ?? false,
      show_about_lama: show_about_lama ?? false,
      file_upload_enable: file_upload_enable ?? false,
      feedBucketAccess,
      feedbucketToken,
      AccessKey: process.env?.API_ACCESS_KEY,
      csrfToken,
    },
    {
      status: 200,
    }
  );
};

export const action: ActionFunction = async ({ request }) => {
  let formdata = await request.formData();
  let userId = formdata.get("userId") as string;
  let isPWA = formdata.get("isPWA") as string;
  let device = formdata.get("device") as string;

  let ip = getIpAddressByRequest(request);
  if (!!userId) {
    let data = update_pwa(userId, isPWA);
  }
  saveIpAddress({ userId, ipAddress: ip, isPWA, device });
  return "data";
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
        "Monlam, AI , tibetan , dictionary ,translation ,orc , tts, stt ,login,སྨོན་ལམ་, རིག་ནུས།",
    },
    {
      name: "apple-mobile-web-app-status-bar",
      content: "#0757b5",
    },
  ];
};

function Document({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />{" "}
        <link rel="apple-touch-icon" href="img/logo192web.png" />
        <link rel="apple-touch-startup-image" href="img/logo1280x720web.png" />
        <link rel="apple-touch-startup-image" href="img/logo720x1280web.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="Monlam Chat" />
        <Meta />
        <Links />
      </head>
      <body className="flex h-[100dvh]  mx-auto inset-0 overflow-y-auto overflow-x-hidden dark:bg-slate-700 dark:text-gray-200">
        {children}
        <ScrollRestoration />
        {/* {show_feed_bucket && show && <script dangerouslySetInnerHTML={{ __html: feedbucketScript }}></scrip>} */}
      </body>
    </html>
  );
}

const getDeviceInfo = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone;
  const isPWA = isStandalone ? "PWA" : "Browser";

  const isAndroid = /android/i.test(userAgent) && !/windows/i.test(userAgent);
  const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
  const isMac = /Macintosh|MacIntel|MacPPC|Mac68K/.test(userAgent) && !isIOS;
  const isWindows = /Windows/.test(userAgent);

  let deviceType = "Desktop";
  if (isAndroid) {
    deviceType = "Android";
  } else if (isIOS) {
    deviceType = "iOS";
  } else if (isMac) {
    deviceType = "Mac";
  } else if (isWindows) {
    deviceType = "Windows";
  }

  return {
    userAgent,
    isPWA,
    deviceType,
  };
};

export default function App() {
  let { user } = useLoaderData();
  let [isDarkMode, setIsDarkMode] = useLocalStorage("Darktheme", false);
  const isPWA = useDetectPWA();
  const fetcher = useFetcher();
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    let { deviceType: device } = getDeviceInfo();
    fetcher.submit({ userId: user?.id, isPWA, device }, { method: "POST" });
  }, []);

  return (
    <Document>
      <LitteraProvider locales={["en_US", "bo_TI"]}>
        <div className="flex flex-col flex-1">
          <Header />
          <ClientOnly fallback={<div>loading</div>}>
            {() => <AppInstaller />}
          </ClientOnly>
          {user && <LocationComponent />}
          <div className="flex-1 flex justify-center pt-4  bg-neutral-50 dark:bg-[--main-bg] ">
            <div className="flex-1 max-w-[1280px] px-2 ">
              <Outlet />
              <FeedBucket />
              {process.env.NODE_ENV === "development" && <LiveReload />}
            </div>
          </div>

          <Footer />
        </div>
        <Scripts />
      </LitteraProvider>
      <ToastContainer />
    </Document>
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

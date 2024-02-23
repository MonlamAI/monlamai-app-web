import type {
  LinksFunction,
  LoaderFunction,
  HeadersArgs,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
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
import { ToastContainer } from "react-toastify";
import flagsmith_provider, { feature } from "./services/features.server";
import { useEffect } from "react";
import useLocalStorage from "./component/hooks/useLocaleStorage";
export const loader: LoaderFunction = async ({ request }) => {
  let userdata = await getUserSession(request);
  let fetchdata = await flagsmith_provider.getEnvironmentFlags();

  const isJobEnabled = fetchdata.flags.job_link;
  const isFileUploadEnabled = fetchdata.flags.feat_file_upload;
  const show_mt_language_toggle = fetchdata.flags.show_mt_language_toggle;
  return json(
    {
      user: userdata ? await getUser(userdata?._json?.email) : null,
      isJobEnabled: isJobEnabled.enabled,
      isFileUploadEnabled: isFileUploadEnabled.enabled,
      show_mt_language_toggle: show_mt_language_toggle.enabled,
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
    { title: "Monlam AI | སྨོན་ལམ་རིག་ནུས།" },
    {
      name: "description",
      content:
        "ཕྱི་ལོ་༢༠༢༣ ལོར་སྨོན་ལམ་བོད་ཀྱི་བརྡ་འཕྲིན་ཞིབ་འཇུག་ཁང་དང་། འབྲེལ་ཡོད་སློབ་ཆེན་དང་། ཚོགས་པ་རེ་འགས་མཉམ་འབྲེལ་ངང་བོད་ཀྱི་སྐད་ཡིག་གི་སྐོར་བརྡ་ཕྲིན་ལག་རྩལ་འཕེལ་རྒྱས་གཏོང་བའི་ལས་གཞིའི་ནང་།",
    },
    {
      name: "keywords",
      content: "Monlam, AI",
    },
  ];
};

function Document({ children }: { children: React.ReactNode }) {
  const feedbucketScript = `(function(k) {
    const s=document.createElement('script');s.module=true;s.defer=true;
    s.src="https://cdn.feedbucket.app/assets/feedbucket.js";
    s.dataset.feedbucket=k;document.head.appendChild(s);
})('0csPeBQ216w32NZdoqnk')`;
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <Meta />
        <Links />
        <script dangerouslySetInnerHTML={{ __html: feedbucketScript }}></script>
      </head>
      <body className="inset-0 overflow-y-auto overflow-x-hidden dark:bg-slate-700 dark:text-gray-200">
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
        {user && <Header />}
        <Outlet />
        {user && !isSteps && <Footer />}
      </LitteraProvider>
      <ToastContainer />
    </Document>
  );
}

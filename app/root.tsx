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
import { getUser } from "./modal/user";
import ErrorMessage from "./component/ErrorMessage";
import uselitteraTranlation from "./component/hooks/useLitteraTranslation";
import StepWizard from "./routes/steps/component/StepWizard";
export const loader: LoaderFunction = async ({ request }) => {
  let userdata = await getUserSession(request);
  return json(
    {
      user: userdata ? await getUser(userdata?._json?.email) : null,
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
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
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
  let { locale } = uselitteraTranlation();
  let isSteps = location.pathname.includes("steps");
  let isEnglish = locale === "en_US";

  return (
    <Document>
      <LitteraProvider locales={["en_US", "bo_TI"]}>
        {user && <Header />}
        <div
          className={`${
            isEnglish ? "font-poppins" : "font-monlam"
          } leading-[normal]`}
        >
          <Outlet />
        </div>
        {user && !isSteps && <Footer />}
      </LitteraProvider>
    </Document>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <Document>
      <ErrorMessage error={error} />
    </Document>
  );
}

import {
  defer,
  type LinksFunction,
  type LoaderFunction,
  type MetaFunction,
} from "@remix-run/node";
import Main from "~/component/Mainpage";
import { getUserSession } from "~/services/session.server";


export const loader: LoaderFunction = async ({ request }) => {
  let user = await getUserSession(request);
  let { AUTH0_DOMAIN, AUTH0_CLIENT_ID, NODE_ENV } = process.env;
  return defer({
    user,
    env: { AUTH0_DOMAIN, AUTH0_CLIENT_ID, NODE_ENV },
  });
};

export const meta: MetaFunction = () => {
  return [
    { title: "Monlam Ai Tools" },
    { name: "description", content: "Tools in MonlamAi" },
  ];
};

export const links: LinksFunction = () => {
  return [
    {
      rel: "icon",
      href: "/assets/logo.png",
      type: "image/png",
    },
  ];
};

export default function Index() {
  return (
    <div>
      <Main />
    </div>
  )
}

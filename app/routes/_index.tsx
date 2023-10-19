import {
  defer,
  type LinksFunction,
  type LoaderFunction,
  type MetaFunction,
  redirect,
} from "@remix-run/node";
import Disclaimer from "~/component/Disclaimer";
import Hero from "~/component/Hero";
import Tools from "~/component/Tools";
import { getUser } from "~/modal/user";
import { auth } from "~/services/auth.server";
import { getUserSession } from "~/services/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  let userdata = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  let user = await getUser(userdata._json.email);

  return defer({
    user,
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
    <main>
      <Tools />
    </main>
  );
}

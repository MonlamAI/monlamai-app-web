import {
  defer,
  type LinksFunction,
  type LoaderFunction,
  type MetaFunction,
} from "@remix-run/node";
import Disclaimer from "~/component/Disclaimer";
import Hero from "~/component/Hero";
import PowerUser from "~/component/PowerUser";
import List from "~/component/Tools";
import { getUser } from "~/modal/user";
import { getUserSession } from "~/services/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  let userdata = await getUserSession(request);
  if (!userdata) return { user: null };
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
    <main className="-mt-20">
      <Hero />
      <List />
      <PowerUser />
      <Disclaimer />
    </main>
  );
}

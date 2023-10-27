import {
  defer,
  type LinksFunction,
  type LoaderFunction,
  type MetaFunction,
  redirect,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Disclaimer from "~/component/Disclaimer";
import Hero from "~/component/Hero";
import StepWizard from "~/component/StepWizard";
import Tools from "~/component/Tools";
import { getUserAboutData } from "~/modal/aboutUser";
import { getUser } from "~/modal/user";
import { auth } from "~/services/auth.server";
export const loader: LoaderFunction = async ({ request }) => {
  let userdata = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  let user = await getUser(userdata?._json.email);
  //check if all questions are answered
  let aboutUser = await getUserAboutData(user?.id);
  if (!aboutUser) return redirect("/steps");
  return defer({
    user,
  });
};

export const meta: MetaFunction = () => {
  return [
    { title: "Monlam AI Tools" },
    { name: "description", content: "Tools in MonlamAi" },
  ];
};

export default function Index() {
  return (
    <main>
      <Tools />
    </main>
  );
}

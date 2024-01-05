import { type LoaderFunction, redirect, json } from "@remix-run/node";
import ErrorMessage from "~/component/ErrorMessage";
import Tools from "~/routes/_index/component/Tools";
import { getUserAboutData } from "~/modal/aboutUser";
import { getOrCreateUser, getUser } from "~/modal/user";
import { auth } from "~/services/auth.server";
import { destroySession } from "~/services/session.server";
export const loader: LoaderFunction = async ({ request }) => {
  let userdata = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  let user = await getOrCreateUser(userdata);

  //check if all questions are answered
  let aboutUser = await getUserAboutData(user?.id);
  if (!aboutUser) return redirect("/steps");
  return json({
    user,
  });
};

export default function Index() {
  return <Tools />;
}

export function ErrorBoundary({ error }) {
  return (
    <>
      <ErrorMessage error={error} />
    </>
  );
}

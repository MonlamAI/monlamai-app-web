import { type LoaderFunction, redirect, json } from "@remix-run/node";
import ErrorMessage from "~/component/ErrorMessage";
import Tools from "~/routes/_index/component/Tools";
import { getOrCreateUser } from "~/modal/user.server";
import { auth } from "~/services/auth.server";
import { getUserSession } from "~/services/session.server";
export const loader: LoaderFunction = async ({ request }) => {
  let userdata = await getUserSession(request);
  if (!userdata) {
    return redirect("/login");
  }
  let user = await getOrCreateUser(userdata);
  //check if all questions are answered
  // let aboutUser = await getUserAboutData(user?.id);
  // if (!aboutUser) return redirect("/steps");
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

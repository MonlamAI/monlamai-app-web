import { type LoaderFunction, redirect, json } from "@remix-run/node";
import ErrorMessage from "~/component/ErrorMessage";
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

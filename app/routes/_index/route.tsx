import { type LoaderFunction, redirect, json } from "@remix-run/node";
import ErrorMessage from "~/component/ErrorMessage";
import Tools from "~/routes/_index/component/Tools";
import { getOrCreateUser } from "~/modal/user.server";
import { auth } from "~/services/auth.server";
import { useLocale } from "~/component/hooks/useLocale";
import { useLitteraMethods } from "@assembless/react-littera";
import { useEffect } from "react";
export const loader: LoaderFunction = async ({ request }) => {
  let userdata = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  let user = await getOrCreateUser(userdata);

  //check if all questions are answered
  // let aboutUser = await getUserAboutData(user?.id);
  // if (!aboutUser) return redirect("/steps");
  return json({
    user,
  });
};

export default function Index() {
  const { isEnglish } = useLocale();
  const methods = useLitteraMethods();

  useEffect(() => {
    if (isEnglish) {
      methods.setLocale("en_US");
    } else {
      methods.setLocale("bo_TI");
    }
  }, []);
  return <Tools />;
}

export function ErrorBoundary({ error }) {
  return (
    <>
      <ErrorMessage error={error} />
    </>
  );
}

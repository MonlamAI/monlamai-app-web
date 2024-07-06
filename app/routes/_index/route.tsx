import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { type LoaderFunction, json } from "@remix-run/node";
import Tools from "~/routes/_index/component/Tools";
import { getUserDetail } from "~/services/session.server";
import { ErrorPage } from "~/component/ErrorPages";
export const loader: LoaderFunction = async ({ request }) => {
  let user = await getUserDetail(request);
  return json({
    user,
  });
};

export default function Index() {
  return <Tools />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return <ErrorPage error={error} />;
  }
  return <ErrorPage error={error} />;
}

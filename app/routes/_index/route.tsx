import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import Tools from "~/routes/_index/component/Tools";
import { ErrorPage } from "~/component/ErrorPages";

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

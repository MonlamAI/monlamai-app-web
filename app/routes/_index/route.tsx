import { type LoaderFunction, json } from "@remix-run/node";
import ErrorMessage from "~/component/ErrorMessage";

import Tools from "~/routes/_index/component/Tools";
import { getUserDetail } from "~/services/session.server";
export const loader: LoaderFunction = async ({ request }) => {
  let user = await getUserDetail(request);
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

import { LinksFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import { getInferences } from "~/modal/inference.server";
import InferenceList from "./component/inferencesList";
import { startOfMonth, endOfMonth } from "date-fns";
import DateStyle from "react-date-range/dist/styles.css"; // default style
import DateStyleDefault from "react-date-range/dist/theme/default.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: DateStyle },
  { rel: "stylesheet", href: DateStyleDefault },
];

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const startDate = url.searchParams.get("startDate");
  const endDate = url.searchParams.get("endDate");

  let inferences = await getInferences({
    startDate: startDate ?? startOfMonth(new Date()),
    endDate: endDate ?? endOfMonth(new Date()),
  });

  return { inferences };
};

function admin() {
  let { inferences } = useLoaderData();
  return (
    <div>
      <InferenceList inferences={inferences} />
    </div>
  );
}

export default admin;

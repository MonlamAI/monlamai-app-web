import { LinksFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import { getInferences } from "~/modal/inference.server";
import InferenceList from "./component/inferencesList";

import DateStyle from "react-date-range/dist/styles.css"; // default style
import DateStyleDefault from "react-date-range/dist/theme/default.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: DateStyle },
  { rel: "stylesheet", href: DateStyleDefault },
];

export const loader: LoaderFunction = async ({}) => {
  let inferences = await getInferences();

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

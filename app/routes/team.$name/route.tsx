import { useLoaderData } from "@remix-run/react";
import React from "react";

// load the name from the URL
export const loader: LoaderFunction = async ({ params }) => {
  console.log(params, "name is:", params.name);
  return { name: params.name };
};

function PersonalisedPage() {
  const { name } = useLoaderData();

  return <div>{name} is the name</div>;
}

export default PersonalisedPage;

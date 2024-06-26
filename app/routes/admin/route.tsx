import { LinksFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import React from "react";
import { getInferences, getInferencesCount } from "~/modal/inference.server";
import InferenceList from "./component/inferencesList";
import { startOfMonth, endOfMonth } from "date-fns";
import DateStyle from "react-date-range/dist/styles.css"; // default style
import DateStyleDefault from "react-date-range/dist/theme/default.css";
import { getUsersCount } from "~/modal/user.server";
import UserCount from "./component/UserCount";
import InferenceCount from "./component/InferenceCount";
import { SelectionList } from "./component/SelectionList";
import { ClientOnly } from "remix-utils/client-only";
import Map from "./component/Map.client";
import LeafLetStyle from "leaflet/dist/leaflet.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: DateStyle },
  { rel: "stylesheet", href: DateStyleDefault },
  { rel: "stylesheet", href: LeafLetStyle },
];

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const check = url.searchParams.get("check");

  if (!check || check === "user") {
    let usercount = await getUsersCount();
    return { usercount };
  }
  if (check === "inferenceCount") {
    let inferenceCount = await getInferencesCount();
    return { inferenceCount };
  }
  if (check === "inferenceList") {
    const startDate = url.searchParams.get("startDate");
    const endDate = url.searchParams.get("endDate");

    let inferences = await getInferences({
      startDate: startDate ?? startOfMonth(new Date()),
      endDate: endDate ?? endOfMonth(new Date()),
    });

    return { inferences };
  }
  return null;
};

function admin() {
  let [params, setParams] = useSearchParams();
  let check = params.get("check") || "user";
  function onChange(data) {
    setParams((prev) => {
      prev.set("check", data);
      return prev;
    });
  }
  return (
    <>
      <div className="h-[30vh] md:h-[50vh] w-full">
        <ClientOnly fallback={<div>loading</div>}>{() => <Map />}</ClientOnly>
      </div>

      <SelectionList handleSelect={onChange} currentState={check} />
      <div>
        {/* {check === "user" && <UserCount />} */}
        {check === "inferenceCount" && <InferenceCount />}
        {check === "inferenceList" && <InferenceList />}
      </div>
    </>
  );
}

export default admin;

import { ActionFunction, LinksFunction, LoaderFunction } from "@remix-run/node";
import React from "react";
import StepWizard from "~/routes/steps/component/StepWizard";
import wizardStyle from "react-form-wizard-component/dist/style.css";
import {
  getUserAboutData,
  updateUserAboutData,
} from "~/modal/aboutUser.server";
import { auth } from "~/services/auth.server";
import { getUser } from "~/modal/user.server";
import { redirect } from "react-router";

export const loader: LoaderFunction = async ({ request }) => {
  let userdata = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  let user = await getUser(userdata?._json.email);

  let aboutUser = await getUserAboutData(user?.id);
  if (aboutUser) return redirect("/");
  return null;
};

export const links: LinksFunction = () => {
  return [
    {
      rel: "icon",
      href: "/assets/logo.png",
      type: "image/png",
    },
    { rel: "stylesheet", href: wizardStyle },
  ];
};

export const action: ActionFunction = async ({ request }) => {
  let userdata = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  let user = await getUser(userdata?._json.email);
  let formdata = await request.formData();
  let data = Object.fromEntries(formdata.entries());
  let updated_Data = await updateUserAboutData(data, user.id);
  return updated_Data;
};

function steps() {
  return <StepWizard />;
}

export default steps;

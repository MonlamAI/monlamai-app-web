import {
  redirect,
  type ActionFunction,
  type LoaderFunction,
} from "@remix-run/node";
import Footer from "~/component/Footer";
import FormDisplay from "~/component/FormDisplay";
import Header from "~/component/Header";
import { getUserSession } from "~/services/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  let user = await getUserSession(request);
  let { AUTH0_DOMAIN, AUTH0_CLIENT_ID, NODE_ENV } = process.env;
  return {
    env: { AUTH0_DOMAIN, AUTH0_CLIENT_ID, NODE_ENV },
    user,
  };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const name = String(formData.get("name"));
  const organisation = String(formData.get("organisation"));
  const mtPurpose = String(formData.get("mtPurpose"));
  const ocrPurpose = String(formData.get("ocrPurpose"));
  const sttPurpose = String(formData.get("sttPurpose"));
  console.log(
    "user form data:",
    name,
    organisation,
    mtPurpose,
    ocrPurpose,
    sttPurpose
  );
  // reset formdata
  formData.set("name", "");
  formData.set("organisation", "");
  formData.set("mtPurpose", "");
  formData.set("ocrPurpose", "");
  formData.set("sttPurpose", "");
  return redirect("/form");
};

function UserForm() {
  return (
    <>
      <Header />
      <FormDisplay />
      <Footer />
    </>
  );
}

export default UserForm;

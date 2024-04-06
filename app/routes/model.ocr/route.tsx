import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { auth } from "~/services/auth.server";
import { ErrorBoundary } from "../model.mt/route";
import ToolWraper from "~/component/ToolWraper";
import { useRouteLoaderData } from "@remix-run/react";
import DummyOCR from "~/routes/model.ocr/Component/DummyOCR";
import OCR from "./Component/OCR";
import { getUserFileInferences } from "~/modal/inference.server";
import { getUser } from "~/modal/user.server";

export const meta: MetaFunction<typeof loader> = ({ matches }) => {
  const parentMeta = matches.flatMap((match) => match.meta ?? []);
  parentMeta.shift(1);
  return [...parentMeta, { title: "Monlam | ཡིག་འཛིན་རིག་ནུས།" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  let userdata = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  let user = await getUser(userdata?._json.email);

  let inferenceList = await getUserFileInferences({
    userId: user?.id,
    model: "ocr",
  });
  let fileUploadUrl = process.env?.FILE_SUBMIT_URL as string;
  return { user: userdata, inferenceList, fileUploadUrl };
}

export default function Index() {
  const { enable_ocr_model } = useRouteLoaderData("root");
  return (
    <ToolWraper title="OCR">
      <div className="flex flex-col md:flex-row gap-2">
        {enable_ocr_model ? <OCR /> : <DummyOCR />}
      </div>
    </ToolWraper>
  );
}

export { ErrorBoundary };

import type {
  ActionFunction,
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { ErrorBoundary } from "../model.mt/route";
import ToolWraper from "~/component/ToolWraper";
import OCR from "./Component/OCR";
import { updateEdit } from "~/modal/inference.server";
import { getUserSession } from "~/services/session.server";
import crop_style from "react-advanced-cropper/dist/style.css";
import { getHeaders } from "~/component/utils/getHeaders.server";

export const meta: MetaFunction<typeof loader> = ({ matches }) => {
  const parentMeta = matches.flatMap((match) => match.meta ?? []);
  parentMeta.shift(1);
  return [...parentMeta, { title: "Monlam | ཡིག་འཛིན་རིག་ནུས།" }];
};
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: crop_style },
];
export async function loader({ request }: LoaderFunctionArgs) {
  let user = await getUserSession(request);

  const userAgent = request.headers.get("User-Agent") || "";
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );
  return { user, isMobile };
}

export const action: ActionFunction = async ({ request }) => {
  let formdata = await request.formData();

  let method = request.method;
  if (method === "PATCH") {
    let edited = formdata.get("edited") as string;
    let inferenceId = formdata.get("inferenceId") as string;
    const api_url = process.env?.API_URL + `/api/v1/ocr/${inferenceId}?action=edit&edit_text=${edited}`;
    const headers=await getHeaders(request);
    const data=await fetch(api_url, {
      method: "PUT",
      headers,
    });
    let res=await data.json();
    return res?.data?.editOutput

  }
};

export default function Index() {
  return (
    <ToolWraper title="OCR">
      <div className="flex flex-col md:flex-row gap-2">
        <OCR />
      </div>
    </ToolWraper>
  );
}

export { ErrorBoundary };

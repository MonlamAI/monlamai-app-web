import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { Button, Card, Spinner } from "flowbite-react";
import { useState, useEffect } from "react";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa6";
import CopyToClipboard from "~/component/CopyToClipboard";
import { auth } from "~/services/auth.server";
import ErrorMessage from "~/component/ErrorMessage";
import { dummydata } from "~/helper/dummy";
import ToolWraper from "~/component/ToolWraper";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
import InferenceWrapper from "~/component/layout/InferenceWrapper";
export const meta: MetaFunction<typeof loader> = ({ matches }) => {
  const parentMeta = matches.flatMap((match) => match.meta ?? []);
  parentMeta.shift(1);
  return [...parentMeta, { title: "Monlam | ཡིག་འཛིན་རིག་ནུས།" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  let userdata = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  return { user: userdata };
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const ocrFormData = new FormData();
  let blob = formData.get("image") as Blob;
  ocrFormData.append("file", blob);
  try {
    const response = await fetch("https://ocr.pecha.tools/", {
      method: "POST",
      body: ocrFormData,
    });

    if (!response.ok) {
      const message = await response.text();
      console.error("message", message);
      return {
        error_message: "Network response was not ok.",
      };
    }
    const data = await response.json();
    return json({
      text: data.output,
    });
  } catch (error) {
    return {
      error_message: "There was a problem with the fetch operation:" + error,
    };
  }
}
let timer;
export default function Index() {
  const [selection, setSelection] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (timer) clearTimeout(timer);
    setLoading(true);
    timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [selection?.text]);
  let { translation } = uselitteraTranlation();
  let text = selection?.text?.replaceAll("\n", "<br />");
  return (
    <ToolWraper title="OCR">
      <div className="flex flex-col md:flex-row gap-2">
        <Card className="md:w-1/2 relative overflow-auto max-h-[50vh]">
          {selection ? (
            <>
              <img src={selection?.image} />
              <Button onClick={() => setSelection(null)}>
                {translation.reset}
              </Button>
            </>
          ) : (
            <div className="overflow-y-scroll flex flex-col gap-2">
              {dummydata?.map((item, index) => {
                return (
                  <div className="flex gap-1">
                    <div className="flex items-center">{item.id}.</div>
                    <Card
                      onClick={() => setSelection(item)}
                      key={item.id + index}
                    >
                      <img src={item.image} alt={item.image} />
                    </Card>
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        <Card className="md:w-1/2 overflow-auto max-h-[50vh]">
          <div className="w-full min-h-[20vh] md:min-h-[40vh] leading-6 p-3 text-black bg-slate-50 dark:text-gray-200 dark:bg-slate-700 rounded-lg overflow-auto">
            <div className="h-full flex justify-center items-center">
              {loading ? (
                <Spinner size="lg" hidden={!selection?.text} />
              ) : (
                <div
                  className="h-full text-sm font-monlam md:text-2xl "
                  style={{ lineHeight: "1.8" }}
                  dangerouslySetInnerHTML={{ __html: text }}
                ></div>
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <Button color="white" disabled={true}>
              <FaRegThumbsUp color="gray" size="20px" />
            </Button>
            <Button color="white" disabled={true}>
              <FaRegThumbsDown color="gray" size="20px" />
            </Button>
            <CopyToClipboard
              textToCopy={selection?.text ?? ""}
              disabled={false}
            />
          </div>
        </Card>
      </div>
    </ToolWraper>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <>
      <ErrorMessage error={error} />
    </>
  );
}

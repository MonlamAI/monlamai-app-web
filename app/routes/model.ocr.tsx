import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
  LinksFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { Button, Card, FileInput, Label, Spinner } from "flowbite-react";
import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa6";
import CopyToClipboard from "~/component/CopyToClipboard";
import { auth } from "~/services/auth.server";
import ErrorMessage from "~/component/ErrorMessage";
import { AiFillFileText } from "react-icons/ai";
import { dummydata } from "~/helper/dummy";
import SVG from "~/styles/OCR_logo.svg";
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

  return (
    <main className="mx-auto w-11/12 lg:w-4/5">
      <h1 className="flex gap-4 justify-center items-center mb-10 text-2xl lg:text-3xl text-center text-slate-700">
        <div className="text-[#9933FF] text-[47px] -mt-2">
          <img src={SVG} height={45} width={45} />
        </div>
        ཡིག་འཛིན་རིག་ནུས།
      </h1>

      <div className="mt-1 flex flex-col md:flex-row  lg:h-[55vh] items-strech gap-5">
        <Card className="md:w-1/2 relative">
          {selection ? (
            <>
              <img src={selection?.image} />
              <Button onClick={() => setSelection(null)}>go back</Button>
            </>
          ) : (
            <div className="overflow-y-scroll flex flex-col gap-2">
              {dummydata?.map((item, index) => {
                return (
                  <div onClick={() => setSelection(item)}>
                    {index + 1}. <img src={item.image} alt={item.image} />
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        <Card className="md:w-1/2">
          <div className="w-full min-h-[20vh] md:min-h-[40vh] leading-6 p-3 text-black bg-slate-50 rounded-lg overflow-auto">
            <div className="h-full flex justify-center items-center">
              {loading ? (
                <Spinner size="lg" hidden={!selection?.text} />
              ) : (
                <div className="h-full text-sm md:text-xl">
                  {selection?.text}
                </div>
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
    </main>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <>
      <ErrorMessage error={error} />
    </>
  );
}

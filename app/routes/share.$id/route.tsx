import { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Button, Card } from "flowbite-react";
import { FaArrowRightArrowLeft, FaUniregistry } from "react-icons/fa6";
import { auth } from "~/services/auth.server";
import { db } from "~/services/db.server";
import CardComponent from "~/component/Card";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
import AudioPlayer from "~/routes/model.tts/components/AudioPlayer";
import HeaderComponent from "~/component/HeaderComponent";
import Devider from "~/component/Devider";
import { ClientOnly } from "remix-utils/client-only";
import { getHeaders } from "~/component/utils/getHeaders.server";

const langLabels = {
  bo: "བོད་སྐད།",
  en: "English",
  hi: "Hindi",
  zh: "Chinese",
  fr: "French",
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const userdata = await auth.isAuthenticated(request);
  const id = params.id;
  if (!id) throw new Error("ID parameter is missing");
  let headers = await getHeaders(request);
  const API_URL = process.env.API_URL as string;
  let response = await fetch(API_URL + "/share/"+id, {
    method: "GET",
    headers,
  });
  let record=await response.json();
  if (!record) throw new Error(`No data found for ID: ${id}`);
  const data=record.record;
  const langDir = record.record.inputLang === "en" ? "en2bo" : "bo2en";
  const model: string = record.table=='translation'?"mt":record.table;
  return { id, data, user: userdata, langDir, model };
};

function InputCard({ content, className, model }) {
  if (model === "ocr") {
    return (
      <CardComponent>
        <img src={content} alt="input" className="object-contain p-3" />
      </CardComponent>
    );
  }
  if (model === "stt") {
    let audioURL = content;
    return (
      <CardComponent>
        <AudioPlayer audioURL={audioURL} />
      </CardComponent>
    );
  }
  return (
    <CardComponent>
      <div className="h-full p-3">
        <div className={`${className} `}>{content}</div>
      </div>
    </CardComponent>
  );
}
function OutputCard({ content, className, model }) {
  let text = content;
  if (model === "ocr") {
    const nonTibetanRegex = /[^\u0F00-\u0FFF\s]/g;
    text = text?.replace(nonTibetanRegex, "");
  }
  if (model === "tts") {
    return (
      <CardComponent>
        <ClientOnly>{() => <AudioPlayer audioURL={content} />}</ClientOnly>
      </CardComponent>
    );
  }
  return (
    <CardComponent>
      <div className="h-full p-3">
        <div className={`${className} `}>{text}</div>
      </div>
    </CardComponent>
  );
}
function ShareRoute() {
  const props= useLoaderData();
  const { id, data, user, langDir, model }=props;
  if (!data) {
    return (
      <div className="flex gap-2 flex-col text-center capitalize">
        <span>Not found</span>
        <Link to="/" className="block mx-auto">
          <Button color="blue" type="button">
            <FaUniregistry className="mr-2" />
            Try it yourself
          </Button>
        </Link>
      </div>
    );
  }
  const sourceLang = langDir === "en2bo" ? "en" : "bo";
  const targetLang = langDir === "en2bo" ? "bo" : "en";
  const modelString = model.toUpperCase();
  return (
    <div className="w-full flex flex-col z-20 mt-20">
      <div className="flex flex-col rounded-lg overflow-hidden  border dark:border-[--card-border] border-dark_text-secondary">
        {model === "mt" ? (
          <MTHeader sourceLang={sourceLang} targetLang={targetLang} />
        ) : (
          <HeaderComponent model={modelString} />
        )}
        <div className="flex flex-1 rounded-sm overflow-hidden flex-col md:flex-row h-auto">
          <InputCard
            content={data.input}
            className="font-poppins"
            model={model}
          />
          <Devider />
          <OutputCard
            content={data.output}
            className="font-monlam"
            model={model}
          />
        </div>
      </div>
      <div className="self-end mt-4">
        <Link to="/">
          <Button color="blue" type="button">
            <FaUniregistry className="mr-2" />
            Try it yourself
          </Button>
        </Link>
      </div>
    </div>
  );
}

function MTHeader({ sourceLang, targetLang }) {
  const { isTibetan: isTib } = uselitteraTranlation();

  return (
    <div
      className={`${
        isTib ? "font-monlam text-base" : "font-poppins"
      } bg-white border-b py-2.5 px-5 font-normal  dark:border-[--card-border] border-dark_text-secondary  dark:bg-[--card-bg] flex  items-center  md:flex-row gap-3`}
    >
      <div className={`flex-1 ${sourceLang === "bo" && " font-monlam"}`}>
        {langLabels[sourceLang]}
      </div>
      <div className={`md:flex-1 " ${targetLang === "bo" && " font-monlam"}`}>
        {langLabels[targetLang]}
      </div>
    </div>
  );
}

export default ShareRoute;

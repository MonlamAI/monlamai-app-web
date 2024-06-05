import { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Button, Card } from "flowbite-react";
import { FaArrowRightArrowLeft, FaUniregistry } from "react-icons/fa6";
import Waveform from "~/component/AudioPlayerWithWave";
import { auth } from "~/services/auth.server";
import { db } from "~/services/db.server";
import CardComponent from "~/component/Card";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
import AudioPlayer from "~/routes/model.tts/components/AudioPlayer";
import HeaderComponent from "~/component/HeaderComponent";

const langLabels = {
  bo: "བོད་སྐད།",
  en: "English",
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const userdata = await auth.isAuthenticated(request);
  const id = params.id;
  if (!id) throw new Error("ID parameter is missing");

  const data = await db.inference.findUnique({
    where: { id },
  });
  if (!data) throw new Error(`No data found for ID: ${id}`);

  const langDir = data.inputLang === "en" ? "en2bo" : "bo2en";
  const model: string = data?.model;
  return { id, data, user: userdata, langDir, model };
};

function InputCard({ content, className, model }) {
  if (model === "ocr") {
    return (
      <Card>
        <div className="w-full">
          <div className={`md:w-[600px] ${className} mt-4`}>
            <img
              src={content}
              alt="input"
              className="object-contain h-[35vh]"
            />
          </div>
        </div>
      </Card>
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
        <div className={`md:w-[600px] ${className} `}>{content}</div>
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
        {content && <AudioPlayer audioURL={content} />}
      </CardComponent>
    );
  }
  return (
    <CardComponent>
      <div className="h-full p-3">
        <div className={`md:w-[600px] ${className} `}>{text}</div>
      </div>
    </CardComponent>
  );
}
function TranslationRoute() {
  const { id, data, user, langDir, model } = useLoaderData();

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
  return (
    <div className="w-full flex flex-col z-20 mt-20 ">
      <div className="w-full rounded-sm overflow-hidden flex flex-col  md:mx-auto  md:min-h-[516px]  ">
        {model === "mt" ? (
          <MTHeader sourceLang={sourceLang} targetLang={targetLang} />
        ) : (
          <HeaderComponent model="STT" selectedTool="" />
        )}
        <div className="flex flex-1 rounded-sm overflow-hidden flex-col md:flex-row h-auto ">
          <InputCard
            content={data.input}
            className="font-poppins"
            model={model}
          />
          <OutputCard
            content={data.output}
            className="font-monlam"
            model={model}
          />
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
    </div>
  );
}

function MTHeader({ sourceLang, targetLang }) {
  const { isTibetan: isTib } = uselitteraTranlation();

  return (
    <div
      className={`${
        isTib ? "font-monlam text-base" : "font-poppins"
      } bg-white border-b py-2 px-2 font-normal  dark:border-light_text-secondary border-dark_text-secondary  dark:bg-secondary-700 flex  items-center  md:flex-row gap-3  `}
    >
      <div className="flex-1 ">{langLabels[sourceLang]}</div>
      <div className="flex-1">{langLabels[targetLang]}</div>
    </div>
  );
}

export default TranslationRoute;

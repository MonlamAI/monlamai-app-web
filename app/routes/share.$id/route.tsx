import { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Button, Card } from "flowbite-react";
import { FaArrowRightArrowLeft, FaUniregistry } from "react-icons/fa6";
import { ShareToolWraper } from "~/component/ToolWraper";
import { auth } from "~/services/auth.server";
import { db } from "~/services/db.server";

const langLabels = {
  bo: "བོད་སྐད།",
  en: "English",
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const userdata = await auth.isAuthenticated(request);
  const id = params.id;
  if (!id) throw new Error("ID parameter is missing");

  const data = await db.inference.findUnique({
    where: { id: parseInt(id, 10) },
  });
  if (!data) throw new Error(`No data found for ID: ${id}`);

  const langDir = data.inputLang === "en" ? "en2bo" : "bo2en";
  const model: string = data?.model;
  return { id, data, user: userdata, langDir, model };
};

function Header({ user }) {
  return !user ? (
    <header className="text-2xl flex gap-3 p-4 justify-center font-medium text-gray-700 text-center dark:text-gray-200">
      <img
        src="/assets/logo.png"
        width="40px"
        alt="Monalm AI"
        className="relative -top-1"
      />
      Monlam AI
    </header>
  ) : null;
}

function InputCard({ title, content, className, model }) {
  if (model === "stt") {
    return (
      <Card>
        <div className="h-full">
          <div className="text-gray-400 text-xl">{title}:</div>
          <div className={`md:w-[600px] ${className} mt-4`}>
            <audio controls>
              <source
                src={`data:audio/wav;base64,${content}`}
                type="audio/wav"
              />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      </Card>
    );
  }
  return (
    <Card>
      <div className="h-full">
        <div className="text-gray-400 text-xl">{title}:</div>
        <div className={`md:w-[600px] ${className} mt-4`}>{content}</div>
      </div>
    </Card>
  );
}
function OutputCard({ title, content, className, model }) {
  if (model === "tts") {
    return (
      <Card>
        <div className="h-full">
          <div className="text-gray-400 text-xl">{title}:</div>
          <div className={`md:w-[600px] ${className} mt-4`}>
            <audio controls>
              <source
                src={`data:audio/wav;base64,${content}`}
                type="audio/wav"
              />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      </Card>
    );
  }
  return (
    <Card>
      <div className="h-full">
        <div className="text-gray-400 text-xl">{title}:</div>
        <div className={`md:w-[600px] ${className} mt-4`}>{content}</div>
      </div>
    </Card>
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
    <div className="flex flex-col z-20">
      <Header user={user} />
      <div className="flex flex-col  md:mx-auto gap-3 justify-between ">
        <ShareToolWraper title={model?.toUpperCase()}>
          {model === "mt" && (
            <LanguageSwitcher sourceLang={sourceLang} targetLang={targetLang} />
          )}
          <div className="flex flex-col md:flex-row h-[50vh] gap-3">
            <InputCard
              title="User"
              content={data.input}
              className="font-poppins"
              model={model}
            />
            <OutputCard
              title="Translation"
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
        </ShareToolWraper>
      </div>
    </div>
  );
}

function LanguageSwitcher({ sourceLang, targetLang }) {
  return (
    <div className="w-full text-center">
      <div className="flex justify-center items-center gap-2">
        <div
          className={`inline-block text-lg text-gray-500 dark:text-gray-300 ${
            sourceLang === "en"
              ? "font-poppins text-xl"
              : "text-lg leading-loose font-monlam"
          }`}
        >
          {langLabels[sourceLang]}
        </div>
        <button
          disabled
          className="group flex items-center justify-center text-center font-medium relative focus:z-10 focus:outline-none text-white bg-primary border border-transparent enabled:hover:bg-primary-hover focus:ring-primary dark:bg-primary dark:enabled:hover:bg-primary-hover dark:focus:ring-primary rounded-full focus:ring-2 px-2"
        >
          <FaArrowRightArrowLeft size="20px" />
        </button>
        <div
          className={`inline-block text-lg text-right text-gray-500 dark:text-gray-300 ${
            sourceLang !== "en"
              ? "font-poppins text-xl"
              : "text-lg leading-loose font-monlam"
          }`}
        >
          {langLabels[targetLang]}
        </div>
      </div>
    </div>
  );
}

export default TranslationRoute;

import type { ActionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { Button, Card, Label, Radio, Spinner, Textarea } from "flowbite-react";
import { useState, useRef } from "react";
import {
  FaArrowRightArrowLeft,
  FaRegThumbsDown,
  FaRegThumbsUp,
} from "react-icons/fa6/index.js";
import CopyToClipboard from "~/component/CopyToClipboard";
import { auth } from "~/services/auth.server";
import { fetchGPTData } from "~/services/fetchGPTData.server";

const langLabels = {
  bo: "བོད་ཡིག།",
  en: "དབྱིན་ཡིག།",
};

const charLimit = 2000;

const boTexts = [
  "བདག་ནི་སྐྱེ་བ་ཐམས་ཅད་དུ།",
  "བསྟན་པ་གསལ་བར་བྱེད་གྱུར་ཅིག",
  "བསྟན་པ་གསལ་བར་མ་ནུས་ནའང་",
];

function parseApiResponse(apiResponse: String) {
  const translationStartIndex = apiResponse.indexOf("data: ") + 7;
  const translationEndIndex = apiResponse.indexOf(
    "<br /><br />",
    translationStartIndex
  );

  if (translationStartIndex !== -1 && translationEndIndex !== -1) {
    const translationOutput = apiResponse.substring(
      translationStartIndex,
      translationEndIndex
    );
    const disclaimerStartIndex = translationEndIndex + 12; // Skip "<br /><br /><small><i>"
    const disclaimerEndIndex = apiResponse.indexOf(
      "</i></small>",
      disclaimerStartIndex
    );

    if (disclaimerStartIndex !== -1 && disclaimerEndIndex !== -1) {
      const disclaimer = apiResponse.substring(
        disclaimerStartIndex,
        disclaimerEndIndex
      );

      return {
        translation: translationOutput.trim(),
        disclaimer: disclaimer.trim(),
      };
    }
  }

  // Handle invalid response format
  return null;
}

async function translate(text: String, sourceLang: String, targetLang: String) {
  const url = "https://dharmamitra.org/api/translation/";
  const data = {
    input_sentence: text,
    level_of_explanation: 0,
    language: `${sourceLang}-${targetLang}`,
    model: "NO",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.text();
    const parsedResponse = parseApiResponse(responseData);
    if (!parsedResponse) {
      throw new Error("Invalid response format!");
    }
    const { translation, disclaimer } = parsedResponse;
    return {
      translation,
      disclaimer,
    };
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  let userdata = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  return { user: userdata };
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const form = Object.fromEntries(formData);

  if (form.sourceLang === "bo" && !form.sourceText) {
    form.sourceText = form.texts;
  }
  if (form.sourceLang === "en") {
    let prompt = `replace all the abbreviation with full form and preserve newlines , "${form?.sourceText}"  `;
    const data = await fetchGPTData(prompt);
    let text_array = data?.split("\n");

    async function translateText(
      text: string,
      sourceLang: string,
      targetLang: string
    ) {
      return translate(text, sourceLang, targetLang);
    }
    const translationPromises = text_array.map((text: string) => {
      return translateText(text, form.sourceLang, form.targetLang);
    });
    const results = await Promise.all(translationPromises);
    let translation: string[] = [];
    results.flatMap((item) => translation.push(item?.translation));

    return json({
      translation: translation,
    });
  }
  const result = await translate(
    form.sourceText,
    form.sourceLang,
    form.targetLang
  );
  return json({
    translation: result?.translation,
  });
}

export default function Index() {
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("bo");
  const [sourceText, setSourceText] = useState("");
  const fetcher = useFetcher();
  const targetRef = useRef<HTMLDivElement>(null);

  let data = fetcher.data;
  const isActionSubmission = fetcher.state !== "idle";

  const handleLangSwitch = () => {
    fetcher.submit(
      {},
      {
        action: "/reset_actiondata",
      }
    );
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
    setSourceText("");
  };

  let charCount = sourceText?.length;
  let textToCopy =
    sourceLang === "en" && typeof data?.translation === "object"
      ? data?.translation?.join("\n")
      : data?.translation;
  return (
    <main className="mx-auto w-11/12 lg:4/5">
      <h1 className="mb-10 text-2xl lg:text-3xl text-center text-slate-700 ">
        ཡིག་སྒྱུར་རིག་ནུས།
      </h1>
      <div className="flex justify-between items-center">
        <div className="inline-block w-32 text-lg text-gray-500">
          {langLabels[sourceLang]}
        </div>

        <Button onClick={handleLangSwitch} pill size="sm">
          <FaArrowRightArrowLeft size="20px" />
        </Button>

        <div className="inline-block w-32 text-lg text-right text-gray-500">
          {langLabels[targetLang]}
        </div>
      </div>

      <div className="mt-3 flex flex-col md:flex-row items-strech gap-5">
        <Card className="md:w-1/2">
          <fetcher.Form method="post">
            <input type="hidden" name="sourceLang" value={sourceLang} />
            <input type="hidden" name="targetLang" value={targetLang} />
            {sourceLang ? (
              <div className="w-full h-[50vh]">
                <Textarea
                  name="sourceText"
                  placeholder="ཡི་གེ་གཏག་རོགས།..."
                  className={`w-full h-full p-3 border-0 focus:outline-none focus:ring-transparent bg-transparent caret-slate-500 placeholder:text-slate-300 placeholder:font-monlam placeholder:text-lg ${
                    sourceLang == "en" && "font-Inter text-xl"
                  } ${sourceLang == "bo" && "text-lg leading-loose"}`}
                  required
                  value={sourceText}
                  onInput={(e) => {
                    setSourceText((prev) => {
                      let value = e.target?.value;
                      if (value?.length <= charLimit) return value;
                      return prev;
                    });
                  }}
                  autoFocus
                />
              </div>
            ) : (
              <div className="w-full h-[50vh] overflow-auto">
                <fieldset className="w-full flex" id="radio">
                  <legend className="mb-4 text-gray-400">
                    གང་རུང་ཞིག་འདེམ་རོགས།
                  </legend>
                  <div className="flex flex-col gap-4">
                    {boTexts.map((text, index) => (
                      <div
                        className="p-3 flex w-full items-center gap-3 border rounded-md"
                        key={index}
                      >
                        <Radio
                          id={"eg" + index}
                          value={text}
                          name="texts"
                          defaultChecked={index === 0}
                        />
                        <Label
                          htmlFor={"eg" + index}
                          className="text-lg text-slate-700"
                        >
                          {text}
                        </Label>
                      </div>
                    ))}
                  </div>
                </fieldset>
                <div className="mt-10">
                  <p className="text-gray-400 tracking-wide leading-loose">
                    ད་ལྟའི་ཆར་ཁྱེད་རང་ང་ཚོའི་སྒུག་ཐོའི་ནང་ཚུད་ཡོད་པས་ང་ཚོས་ཁྱེད་ལ་དགོངས་དག་ཞུ།
                    ཁྱེད་ཀྱིས་གོང་གི་ཚིག་དུམ་གང་རུང་ཞིག་བདམས་ནས་ང་ཚོའི་རིག་ནུས་ཀྱི་ནུས་པར་ཚོད་ལྟ་བྱེད་ཐུབ།
                  </p>
                </div>
              </div>
            )}
            <div className="mt-5 flex justify-between items-end">
              {sourceLang && (
                <div className="text-gray-400 text-xs">
                  {charCount} / {charLimit}
                </div>
              )}
              <div></div>
              <Button
                type="submit"
                isProcessing={isActionSubmission}
                disabled={sourceText.length < 8}
                className=""
              >
                ཡིག་སྒྱུར།
              </Button>
            </div>
          </fetcher.Form>
        </Card>

        <Card className="md:w-1/2">
          <div className="w-full h-[50vh] p-3 text-black bg-slate-50 rounded-lg overflow-auto">
            {isActionSubmission ? (
              <div className="h-full flex justify-center items-center">
                <Spinner size="lg" />
              </div>
            ) : targetLang === "bo" ? (
              <div
                ref={targetRef}
                className={"text-lg  tracking-wide leading-loose"}
                dangerouslySetInnerHTML={{
                  __html: data?.translation?.join("<br />"),
                }}
              ></div>
            ) : targetLang === "en" ? (
              <div ref={targetRef} className={`text-lg font-Inter`}>
                {data?.translation}
              </div>
            ) : null}
          </div>
          <div className="flex justify-end">
            <Button color="white" disabled={data ? false : true}>
              <FaRegThumbsUp color="gray" size="20px" />
            </Button>
            <Button color="white" disabled={data ? false : true}>
              <FaRegThumbsDown color="gray" size="20px" />
            </Button>
            <CopyToClipboard
              textToCopy={textToCopy}
              disabled={data ? false : true}
            />
          </div>
        </Card>
      </div>
    </main>
  );
}

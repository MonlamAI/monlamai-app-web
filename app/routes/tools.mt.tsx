import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { Button, Card, Label, Radio, Spinner, Textarea } from "flowbite-react";
import { useState } from "react";
import {
  FaArrowRightArrowLeft,
  FaRegThumbsDown,
  FaRegThumbsUp,
} from "react-icons/fa6/index.js";

const langLabels = {
  bo: "Tibetan",
  en: "English",
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

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const form = Object.fromEntries(formData);
  if (form.sourceLang === "bo") {
    form.sourceText = form.texts;
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
  const [charCount, setCharCount] = useState(0);

  const data = useActionData<typeof action>();
  const navigation = useNavigation();
  const isActionSubmission = navigation.state == "submitting";

  const handleLangSwitch = () => {
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
    setSourceText("");
    setCharCount(0);
    let translationDiv = document.getElementById("translation");
    if (translationDiv) {
      translationDiv.innerHTML = "";
    }
  };

  const handleOnChange = (e) => {
    setSourceText(e.target.value.slice(0, charLimit));
    setCharCount(sourceText.length);
  };

  return (
    <main className="mx-auto w-full md:w-11/12 lg:4/5">
      <h1 className="mb-10 text-4xl lg:text-5xl text-center">
        Monlam Translation
      </h1>
      <div className="flex flex-col md:flex-row items-strech md:gap-1">
        <Card className="w-1/2">
          <h3 className="text-lg text-gray-500">{langLabels[sourceLang]}</h3>
          <Form method="post">
            <input type="hidden" name="sourceLang" value={sourceLang} />
            <input type="hidden" name="targetLang" value={targetLang} />
            {sourceLang === "en" ? (
              <div className="w-full h-[50vh]">
                <Textarea
                  name="sourceText"
                  placeholder="Enter your text..."
                  className="w-full h-full border-0 focus:outline-none focus:ring-transparent bg-transparent caret-slate-500 placeholder:text-slate-300 text-xl leading-relaxed"
                  required
                  value={sourceText}
                  onChange={handleOnChange}
                  autoFocus
                />
              </div>
            ) : (
              <div className="w-full h-[50vh] overflow-auto">
                <fieldset className="w-full flex" id="radio">
                  <legend className="mb-4 text-gray-300">
                    Choose a text to translate
                  </legend>
                  <div className="flex flex-col gap-4">
                    {boTexts.map((text, index) => (
                      <div
                        className="p-3 flex w-full items-center gap-2 border rounded-md"
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
                          className="font-monlam text-lg"
                        >
                          {text}
                        </Label>
                      </div>
                    ))}
                  </div>
                </fieldset>
                <div className="mt-10">
                  <p className="text-gray-400 tracking-tight">
                    We apologize for the wait; you are currently on our waiting
                    list. However, you have the option to click on one of the
                    segments to experience firsthand how our model performs.
                  </p>
                </div>
              </div>
            )}
            <div className="mt-5 flex justify-between items-center">
              {sourceLang === "en" && (
                <div className="text-gray-400 text-xs">
                  {charCount} / {charLimit}
                </div>
              )}
              <div></div>
              <Button
                type="submit"
                isProcessing={isActionSubmission}
                className=""
              >
                Translate
              </Button>
            </div>
          </Form>
        </Card>

        <Button
          className="self-start lg:mt-4"
          color="transparent"
          onClick={handleLangSwitch}
          pill
        >
          <FaArrowRightArrowLeft size="20px" className="text-gray-400" />
        </Button>

        <Card className="w-1/2">
          <h3 className="text-lg text-right text-gray-500">
            {langLabels[targetLang]}
          </h3>
          <div className="w-full h-[50vh] p-3 text-black bg-slate-50 rounded-lg overflow-auto">
            {isActionSubmission ? (
              <div className="h-full flex justify-center items-center">
                <Spinner />
              </div>
            ) : (
              <div
                id="translation"
                className={`text-lg ${
                  targetLang == "bo" &&
                  "font-monlam tracking-wide leading-loose"
                }`}
              >
                {data && data.translation}
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <Button color="white">
              <FaRegThumbsUp color="gray" size="20px" />
            </Button>
            <Button color="white">
              <FaRegThumbsDown color="gray" size="20px" />
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
}

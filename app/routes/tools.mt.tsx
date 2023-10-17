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

const boTexts = ["Text 01", "Text 02", "Text 03"];

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  if (data.sourceLang === "bo") {
    data.sourceText = data.texts;
  }

  await timeout(3000);

  return json({
    translation: `Direction: ${data.sourceLang}-${data.targetLang}\n
  Input: ${data.sourceText}\n
  Translation: This is a translation`,
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
  };

  const handleOnChange = (e) => {
    setSourceText(e.target.value.slice(0, charLimit));
    setCharCount(sourceText.length);
  };

  return (
    <main className="mx-auto w-11/12 md:w-4/5">
      <h1 className="mb-5 text-xl text-center">Monlam Translation</h1>
      <div className="flex items-strech gap-1">
        <Card className="w-1/2">
          <h3 className="text-lg text-gray-600">{langLabels[sourceLang]}</h3>
          <Form method="post">
            <input type="hidden" name="sourceLang" value={sourceLang} />
            <input type="hidden" name="targetLang" value={targetLang} />
            {sourceLang === "en" ? (
              <div className="w-full h-[50vh]">
                <Textarea
                  name="sourceText"
                  placeholder="Enter your text..."
                  className="w-full h-full border-0 focus:outline-none focus:ring-transparent bg-transparent caret-slate-500 placeholder:text-slate-300"
                  required
                  value={sourceText}
                  onChange={handleOnChange}
                  autoFocus
                />
              </div>
            ) : (
              <div className="w-full h-[50vh] overflow-auto">
                <fieldset className="w-full flex" id="radio">
                  <legend className="mb-4 text-gray-400">
                    Choose a text to translate
                  </legend>
                  <div className="flex flex-col gap-4">
                    {boTexts.map((text, index) => (
                      <div
                        className="p-2 flex w-full items-center gap-2 border rounded-md"
                        key={index}
                      >
                        <Radio
                          id={"eg" + index}
                          value={text}
                          name="texts"
                          defaultChecked={index === 0}
                        />
                        <Label htmlFor={"eg" + index}>{text}</Label>
                      </div>
                    ))}
                  </div>
                </fieldset>
                <div className="mt-10">
                  <p className="text-gray-600">
                    Join the waitlist to Tibetan input
                  </p>
                </div>
              </div>
            )}
            <div className="mt-5 flex justify-between items-center">
              <Button
                type="reset"
                pill
                color="gray"
                size="xs"
                className="text-slate-500"
              >
                Clear Text
              </Button>
              {sourceLang === "en" && (
                <div className="text-gray-400 text-xs">
                  {charCount} / {charLimit}
                </div>
              )}
              <Button type="submit" size="xs" isProcessing={isActionSubmission}>
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
          <h3 className="text-lg text-right text-gray-600">
            {langLabels[targetLang]}
          </h3>
          <div className="w-full h-[50vh] p-3 text-black bg-slate-100 rounded-lg overflow-auto">
            {isActionSubmission ? (
              <div className="h-full flex justify-center items-center">
                <Spinner />
              </div>
            ) : (
              data && data.translation
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

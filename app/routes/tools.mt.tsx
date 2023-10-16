import { Button, Card, Label, Radio, Textarea } from "flowbite-react";
import {
  FaArrowRightArrowLeft,
  FaRegThumbsDown,
  FaRegThumbsUp,
} from "react-icons/fa6/index.js";

import { useState } from "react";

const langLabels = {
  bo: "Tibetan",
  en: "English",
};

const charLimit = 500;

const boTexts = [
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit fuga obcaecati inventore recusandae natus, repellendus libero mollitia! Pariatur error a temporibus dicta ex, officia dolorem distinctio dignissimos similique! Laborum hic fuga atque voluptatibus veniam quibusdam nisi ipsa fugiat. In nulla iusto architecto quasi, doloribus odit laborum soluta nesciunt assumenda eos",
  "Pariatur error a temporibus dicta ex, officia dolorem distinctio dignissimos similique! Laborum hic fuga atque voluptatibus veniam quibusdam nisi ipsa fugiat. In nulla iusto architecto quasi, doloribus odit laborum soluta nesciunt assumenda eos",
  "Fugit fuga obcaecati inventore recusandae natus, repellendus libero mollitia! Pariatur error a temporibus dicta ex, officia dolorem distinctio dignissimos similique! Laborum hic fuga atque voluptatibus veniam quibusdam nisi ipsa fugiat. In nulla iusto architecto quasi, doloribus odit laborum soluta nesciunt assumenda eos",
];

export default function Index() {
  const [sourceLang, setSourceLang] = useState("bo");
  const [targetLang, setTargetLang] = useState("en");
  const [sourceText, setSourceText] = useState("");
  const [charCount, setCharCount] = useState(0);

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
      <h1 className="mb-5 text-xl text-center">Machine Translation</h1>
      <div className="flex items-strech gap-1 ">
        <Card className="w-1/2">
          <h3 className="text-center font-bold text-gray-800">
            {langLabels[sourceLang]}
          </h3>
          {sourceLang === "en" ? (
            <div className="w-full h-[60vh]">
              <Textarea
                placeholder="Enter your text here"
                className="w-full h-full"
                required
                value={sourceText}
                onChange={handleOnChange}
              />
            </div>
          ) : (
            <div className="w-full h-[60vh] overflow-auto">
              <fieldset className="w-full flex" id="radio">
                <legend className="mb-4 text-gray-400">
                  Choose a text to translate from:
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
          <div className="flex justify-between items-center">
            <Button pill color="gray" size="xs">
              Reset
            </Button>
            {sourceLang === "en" && (
              <div className="text-gray-400 text-xs">
                {charCount} / {charLimit}
              </div>
            )}
            <Button pill color="success" size="xs">
              Submit
            </Button>
          </div>
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
          <h3 className="text-center font-bold text-gray-900">
            {langLabels[targetLang]}
          </h3>
          <div className="w-full h-[60vh]"></div>
          <div className="flex justify-end">
            <Button color="white">
              <FaRegThumbsUp color="gray" />
            </Button>
            <Button color="white">
              <FaRegThumbsDown color="gray" />
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
}

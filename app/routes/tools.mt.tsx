import { Button, Card, Textarea } from "flowbite-react";
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

export default function Index() {
  const [sourceLang, setSourceLang] = useState("bo");
  const [targetLang, setTargetLang] = useState("en");

  const handleLangSwitch = () => {
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
  };

  return (
    <main className="m-auto w-11/12 md:w-4/5">
      <h1>MT Page</h1>
      <div className="flex items-center gap-1">
        <Card className="w-1/2">
          <h3 className="text-center font-bold text-gray-800">
            {langLabels[sourceLang]}
          </h3>
          <Textarea
            placeholder="Enter your text here"
            className="w-full h-48"
            required
          />
          <div className="flex justify-between">
            <Button pill color="gray" size="xs">
              Reset
            </Button>
            <Button pill color="success" size="xs">
              Submit
            </Button>
          </div>
        </Card>
        <Button
          className="self-start lg:mt-4"
          color="transparent"
          onClick={handleLangSwitch}
        >
          <FaArrowRightArrowLeft size="20px" className="text-gray-400" />
        </Button>
        <Card className="w-1/2">
          <h3 className="text-center font-bold text-gray-900">
            {langLabels[targetLang]}
          </h3>
          <div className="w-full h-48"></div>
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

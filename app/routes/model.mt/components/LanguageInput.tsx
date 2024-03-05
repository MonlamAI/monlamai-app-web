import { useSearchParams } from "@remix-run/react";
import { Select } from "flowbite-react";
import React from "react";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

function LanguageInput() {
  const [params, setParams] = useSearchParams();
  const sourceLang = params.get("source") || "en";
  const targetLang = params.get("target") || "bo";
  function handleChangeTo(event: React.ChangeEvent<HTMLSelectElement>) {
    const lang = event.target.value;
    setParams((p) => {
      p.set("target", lang);
      return p;
    });
  }
  function handleChangefrom(event: React.ChangeEvent<HTMLSelectElement>) {
    const lang = event.target.value;
    setParams((p) => {
      p.set("source", lang);
      return p;
    });
  }
  function toggleDirection() {
    setParams((p) => {
      const source = sourceLang;
      const target = targetLang;
      p.set("source", target);
      p.set("target", source);
      return p;
    });
  }
  return (
    <div className="flex items-center justify-center md:flex-row gap-3 mt-2 ">
      <Select
        placeholder="eg. fr"
        onChange={handleChangefrom}
        value={sourceLang}
        className="w-full"
      >
        <option value="en">English</option>
        <option value="bo">Tibetan</option>
        <option value="kr">Korean</option>
        <option value="fr">French</option>
        <option value="zh">Chinese</option>
      </Select>
      <div
        className="text-2xl font-bold cursor-pointer"
        onClick={toggleDirection}
      >
        <FaArrowRightArrowLeft size="20px" />
      </div>
      <Select
        placeholder="eg. fr"
        onChange={handleChangeTo}
        value={targetLang}
        className="w-full"
      >
        <option value="en">English</option>
        <option value="bo">Tibetan</option>
        <option value="kr">Korean</option>
        <option value="fr">French</option>
        <option value="zh">Chinese</option>
      </Select>
    </div>
  );
}

export default LanguageInput;

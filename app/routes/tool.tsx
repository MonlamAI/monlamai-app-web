import { Link } from "@remix-run/react";

function tool() {
  let tools = ["mt", "ocr", "stt", "tts"];

  return (
    <div className="h-screen w-screen flex justify-center items-center gap-2">
      {tools.map((tool, index) => {
        return (
          <Link
            key={index}
            to={`/tool/${tool}`}
            className="p-3 shadow-md cursor-pointer hover:bg-gray-200 "
          >
            {tool}
          </Link>
        );
      })}
    </div>
  );
}

export default tool;

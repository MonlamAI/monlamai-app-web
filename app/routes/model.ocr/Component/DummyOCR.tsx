import { Button, Card, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { dummydata } from "~/helper/dummy";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
import CopyToClipboard from "~/component/CopyToClipboard";

let timer: NodeJS.Timeout;

function DummyOCR() {
  const [selection, setSelection] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (timer) clearTimeout(timer);
    setLoading(true);
    timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [selection?.text]);
  let { translation } = uselitteraTranlation();
  let text = selection?.text?.replaceAll("\n", "<br />");
  return (
    <>
      <Card className="md:w-1/2 relative overflow-auto max-h-[50vh]">
        {selection ? (
          <>
            <img src={selection?.image} />
            <Button onClick={() => setSelection(null)}>
              {translation.reset}
            </Button>
          </>
        ) : (
          <div className="overflow-y-scroll flex flex-col gap-2">
            {dummydata?.map((item, index) => {
              return (
                <div className="flex gap-1">
                  <div className="flex items-center">{item.id}.</div>
                  <Card
                    onClick={() => setSelection(item)}
                    key={item.id + index}
                  >
                    <img src={item.image} alt={item.image} />
                  </Card>
                </div>
              );
            })}
          </div>
        )}
      </Card>
      <Card className="md:w-1/2 overflow-auto max-h-[50vh]">
        <div className="w-full min-h-[20vh] md:min-h-[40vh] leading-6 p-3 text-black bg-slate-50 dark:text-gray-200 dark:bg-slate-700 rounded-lg overflow-auto">
          <div className="h-full flex justify-center items-center">
            {loading ? (
              <Spinner size="lg" hidden={!selection?.text} />
            ) : (
              <div
                className="h-full text-sm font-monlam md:text-2xl "
                style={{ lineHeight: "1.8" }}
                dangerouslySetInnerHTML={{ __html: text }}
              ></div>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <Button color="white" disabled={true}>
            <FaRegThumbsUp color="gray" size="20px" />
          </Button>
          <Button color="white" disabled={true}>
            <FaRegThumbsDown color="gray" size="20px" />
          </Button>
          <CopyToClipboard textToCopy={selection?.text ?? ""} />
        </div>
      </Card>
    </>
  );
}

export default DummyOCR;

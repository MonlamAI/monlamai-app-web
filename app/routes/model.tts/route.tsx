import { Spinner } from "flowbite-react";
import {
  MetaFunction,
  useFetcher,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import ReactionButtons from "~/component/ReactionButtons";
import ToolWraper from "~/component/ToolWraper";
import { MAX_SIZE_SUPPORT_DOC } from "~/helper/const";
import ShareLink from "~/component/ShareLink";
import { resetFetcher } from "~/component/utils/resetFetcher";
import { RxCross2 } from "react-icons/rx";
import { CancelButton } from "~/component/Buttons";
import TextComponent from "~/component/TextComponent";
import { ErrorMessage } from "~/component/ErrorMessage";
import CardComponent from "~/component/Card";
import { getUser } from "~/modal/user.server";
import { TtsSubmitButton } from "./components/UtilityComponents";
import { toast } from "react-toastify";
import { getUserSession } from "~/services/session.server";
import { LoaderFunctionArgs } from "@remix-run/node";
import HeaderComponent from "../../component/HeaderComponent";
import Devider from "~/component/Devider";
import AudioPlayer from "./components/AudioPlayer";
import { ErrorBoundary } from "~/component/ErrorPages";
import { CharacterSizeComponent } from "~/component/CharacterSize";
import useEffectAfterFirstRender from "~/component/hooks/useEffectAfterFirstRender";

export const meta: MetaFunction = ({ matches }) => {
  const parentMeta = matches.flatMap((match) => match.meta ?? []);
  parentMeta.shift(1);

  return [{ title: "Monlam | ཀློག་འདོན་རིག་ནུས།" }, ...parentMeta];
};

export async function loader({ request }: LoaderFunctionArgs) {
  let user = await getUserSession(request);

  let CHAR_LIMIT = parseInt(process.env?.MAX_TEXT_LENGTH_TTS!);

  return {
    user,
    CHAR_LIMIT,
  };
}

export default function Index() {
  const [sourceText, setSourceText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [inputUrl, setInputUrl] = useState("");
  const [params, setParams] = useSearchParams();

  let { CHAR_LIMIT } = useLoaderData();
  const fetcher = useFetcher();
  const isLoading = fetcher.state !== "idle";
  const sourceUrl = fetcher.data?.output;
  const inferenceId = fetcher.data?.id;

  let charCount = sourceText?.length;

  const handleReset = () => {
    setSourceText("");
    resetFetcher(fetcher);
  };

  let likeFetcher = useFetcher();

  function submitHandler(e) {
    if (!sourceText || !sourceText.trim()) {
      toast.info("Text input is required for text-to-speech.", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else {
      fetcher.submit(
        {
          input: sourceText,
        },
        {
          method: "POST",
          action: "/api/tts",
        }
      );
    }
  }
  let actionError = fetcher.data?.error as string;

  useEffectAfterFirstRender(() => {
    if (sourceText === "") {
      resetFetcher(fetcher);
    }
  }, [sourceText]);
  return (
    <ToolWraper title="TTS">
      <div className="rounded-[10px] overflow-hidden border dark:border-[--card-border] border-dark_text-secondary">
        <HeaderComponent model="TTS" />
        <div className="flex flex-col lg:flex-row">
          <CardComponent focussed={true}>
            <div className="flex relative h-full min-h-[100px] lg:min-h-[40vh] w-full flex-1 flex-col justify-center">
              <TextComponent
                setSourceText={setSourceText}
                sourceText={sourceText}
                sourceLang={"bo"}
              />

              <CancelButton
                onClick={handleReset}
                hidden={!sourceText || sourceText === ""}
              >
                <RxCross2 size={20} />
              </CancelButton>
            </div>
            {charCount > 0 && sourceText?.trim() !== "" && (
              <div className="flex justify-between p-2 border-t border-t-dark_text-secondary dark:border-t-[--card-border]">
                <CharacterSizeComponent
                  selectedTool={"text"}
                  charCount={charCount}
                  CHAR_LIMIT={CHAR_LIMIT}
                  MAX_SIZE_SUPPORT={MAX_SIZE_SUPPORT_DOC}
                />
                <TtsSubmitButton
                  charCount={charCount}
                  CHAR_LIMIT={CHAR_LIMIT}
                  trigger={submitHandler}
                />
              </div>
            )}
          </CardComponent>
          <Devider />
          <CardComponent>
            <div className="flex min-h-[156px] lg:min-h-[30vh] h-full w-full flex-1 flex-col gap-2">
              {actionError && (
                <ErrorMessage
                  message={actionError}
                  handleClose={() => resetFetcher(fetcher)}
                  type="warning"
                />
              )}
              {isLoading && (
                <div className="flex flex-1 justify-center items-center">
                  <Spinner
                    size="xl"
                    className={"fill-secondary-500 dark:fill-primary-500"}
                  />
                </div>
              )}
              {!isLoading &&  inferenceId && (
                <div className="flex-1 h-full flex justify-center items-center">
                  {sourceUrl && <AudioPlayer audioURL={sourceUrl} />}
                </div>
              )}
            </div>
            {inferenceId && (
              <div className="flex justify-end py-3 px-5 border-t border-t-dark_text-secondary dark:border-t-[--card-border]">
                <div className="flex gap-3 justify-end md:gap-5 items-center p-1">
                  <ReactionButtons
                    fetcher={likeFetcher}
                    output={sourceUrl}
                    sourceText={sourceText}
                    inferenceId={inferenceId}
                    inferenceType="tts"
                    clickEdit={undefined}
                  />

                  {inferenceId && <ShareLink inferenceId={inferenceId} />}
                </div>
              </div>
            )}
          </CardComponent>
        </div>
      </div>
    </ToolWraper>
  );
}

export { ErrorBoundary };

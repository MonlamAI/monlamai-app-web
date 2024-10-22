import { Spinner } from "flowbite-react";
import {
  MetaFunction,
  useFetcher,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";
import { useEffect, useRef, useState,useCallback } from "react";
import ReactionButtons from "~/component/ReactionButtons";
import ToolWraper from "~/component/ToolWraper";
import { MAX_SIZE_SUPPORT_DOC } from "~/helper/const";
import ShareLink from "~/component/ShareLink";
import { resetFetcher } from "~/component/utils/resetFetcher";
import { RxCross2 } from "react-icons/rx";
import { ClientOnly } from "remix-utils/client-only";

import { CancelButton } from "~/component/Buttons";
import TextComponent from "~/component/TextComponent";
import { ErrorMessage } from "~/component/ErrorMessage";
import CardComponent from "~/component/Card";
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
import { auth } from "../../services/auth.server";
import AudioPlayerComponent from "./components/AudioStreamPlayer.client";

export const meta: MetaFunction = ({ matches }) => {
  const parentMeta = matches.flatMap((match) => match.meta ?? []);
  parentMeta.shift(1);

  return [{ title: "Monlam | ཀློག་འདོན་རིག་ནུས།" }, ...parentMeta];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const user =  await auth.isAuthenticated(request);
  const CHAR_LIMIT = parseInt(process.env?.MAX_TEXT_LENGTH_TTS!);

  return {
    user,
    CHAR_LIMIT,
  };
}

export default function Index() {
  const [sourceText, setSourceText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [inputUrl, setInputUrl] = useState("");
  const [params, setParams] = useSearchParams();
  const [audioList, setAudioList] = useState([]);
  let { CHAR_LIMIT } = useLoaderData();
  // const fetcher = useFetcher();
  // const isLoading = fetcher.state !== "idle";
  // const sourceUrl = fetcher.data?.output;
  // const inferenceId = fetcher.data?.id;
  const [inferenceId, setInferenceId] = useState(null); 


 

  let charCount = sourceText?.length;

  const handleReset = () => {
    setSourceText("");
    // resetFetcher(fetcher);
  };

  let likeFetcher = useFetcher();


  const handleEventStream = useCallback(async (text) => {
    let eventSource = null;
    
    try {
      setIsLoading(true);
      
      // Create new promise for stream handling
      return new Promise((resolve, reject) => {
        // Close any existing connection
        if (eventSource) {
          eventSource.close();
        }
        
        // Create new EventSource
        eventSource = new EventSource(
          `/api/tts/stream?text=${encodeURIComponent(text)}`
        );
        
        // Handle messages
        eventSource.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            
            if (data.output) {
              setAudioList(prev => [...prev, data.output]);
            }
            
            if (data.done || data.error) {
              eventSource.close();
              resolve();
            }
          } catch (err) {
            console.error('Error parsing event data:', err);
          }
        };
        
        // Handle errors
        eventSource.onerror = (error) => {
          console.error('EventSource error:', error);
          eventSource.close();
          reject(error);
        };
      });
      
    } catch (error) {
      console.error('Stream handling error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);


  const submitHandler = async (e) => {
    try {
      // Reset audio list before starting new stream
      setAudioList([]);
      await handleEventStream(sourceText);
    } catch (error) {
      console.error('Submit handler error:', error);
      setIsLoading(false);
    }
  };
  useEffectAfterFirstRender(() => {
    if (sourceText === "") {
      // resetFetcher(fetcher);
    }
  }, [sourceText]);

console.log(audioList)
 
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
             
              {isLoading && (
                <div className="flex flex-1 justify-center items-center">
                  <Spinner
                    size="xl"
                    className={"fill-secondary-500 dark:fill-primary-500"}
                  />
                </div>
              )}
                <ClientOnly fallback={null}>
      {() => <AudioPlayerComponent audioUrls={audioList} />}
    </ClientOnly>
            
              {!isLoading &&  inferenceId  && (
                <div className="flex-1 h-full flex justify-center items-center">
                  {/* {sourceUrl && <AudioPlayer audioURL={sourceUrl} />}
                   */}
              
                  
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




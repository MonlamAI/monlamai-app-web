import type {
  ActionFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import {
  ClientLoaderFunctionArgs,
  useFetcher,
  useLoaderData,
  useSearchParams,
  useRouteLoaderData,
} from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import { useState, useRef, useEffect } from "react";
import useDebounce from "~/component/hooks/useDebounceState";
import { ErrorMessage } from "~/component/ErrorMessage";
import ToolWraper from "~/component/ToolWraper";
import {
  getUserFileInferences,
  saveInference,
  updateEdit,
} from "~/modal/inference.server";
import { MAX_SIZE_SUPPORT_DOC } from "~/helper/const";
import {
  EditActionButtons,
  OutputDisplay,
  SubmitButton,
} from "./components/UtilityComponent";
import { NonEditButtons, NonEditModeActions } from "~/component/ActionButtons";
import EditDisplay from "~/component/EditDisplay";
import CardComponent from "~/component/Card";
import { getUser } from "~/modal/user.server";
import { resetFetcher } from "~/component/utils/resetFetcher";
import LanguageInput from "./components/LanguageInput";
import { CancelButton } from "~/component/Buttons";
import { RxCross2 } from "react-icons/rx";
import useTranslate from "./lib/useTranslate";
import { getUserSession } from "~/services/session.server";
import { InferenceList } from "~/component/InferenceList";
import Devider from "~/component/Devider";
import { Spinner } from "flowbite-react";
import getIpAddressByRequest from "~/component/utils/getIpAddress";
import { ErrorBoundary } from "~/component/ErrorPages";
import TextComponent from "~/component/TextComponent";
import { CharacterSizeComponent } from "~/component/CharacterOrFileSize";
import useEffectAfterFirstRender from "~/component/hooks/useEffectAfterFirstRender";

export const meta: MetaFunction<typeof loader> = ({ matches }) => {
  const parentMeta = matches.flatMap((match) => match.meta ?? []);
  parentMeta.shift(1);
  return [{ title: "Monlam | ཡིག་སྒྱུར་རིག་ནུས།" }, ...parentMeta];
};

export async function loader({ request }: LoaderFunctionArgs) {
  let userdata = await getUserSession(request);
  let CHAR_LIMIT = parseInt(process.env?.MAX_TEXT_LENGTH_MT!);

  return json({
    user: userdata,
    CHAR_LIMIT,
  });
}

export const action: ActionFunction = async ({ request }) => {
  let formdata = await request.formData();
  let userdata = await getUserSession(request);
  let ip = getIpAddressByRequest(request);
  let user = await getUser(userdata?._json?.email);
  let method = request.method;
  if (method === "PATCH") {
    let edited = formdata.get("edited") as string;
    let inferenceId = formdata.get("inferenceId") as string;
    let updated = await updateEdit(inferenceId, edited);
    return updated;
  }
  if (method === "POST") {
    let source = formdata.get("source") as string;
    let translation = formdata.get("translation") as string;
    let responseTime = formdata.get("responseTime") as string;
    let inputLang = formdata.get("inputLang") as string;
    let outputLang = formdata.get("targetLang") as string;
    const inferenceData = await saveInference({
      userId: user?.id,
      model: "mt",
      input: source,
      output: translation,
      responseTime: parseInt(responseTime),
      inputLang,
      outputLang,
      ip,
    });
    return { id: inferenceData?.id };
  }
};

export const clientLoader = async ({
  request,
  params,
  serverLoader,
}: ClientLoaderFunctionArgs) => {
  // call the server loader
  const serverData = await serverLoader();
  // And/or fetch data on the client
  // Return the data to expose through useLoaderData()

  return serverData;
};

export default function Index() {
  const [params, setParams] = useSearchParams();

  const target_lang = params.get("target") || "bo";
  const source_lang = params.get("source") || "en";
  const [sourceText, setSourceText] = useState("");

  const { limitMessage, CHAR_LIMIT, user } = useLoaderData();

  const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState("");
  const [inputUrl, setInputUrl] = useState("");

  const debounceSourceText = useDebounce(sourceText, 1000);
  const likefetcher = useFetcher();
  const editfetcher = useFetcher();
  const translationFetcher = useFetcher();
  const detectFetcher = useFetcher();

  const savefetcher = useFetcher();
  const editData = editfetcher.data?.edited;

  let charCount = sourceText?.length;

  function handleCopy() {
    navigator.clipboard.writeText(output);
  }

  let newText = editfetcher.data?.edited;

  function handleEditSubmit() {
    let edited = editText;
    editfetcher.submit(
      {
        inferenceId,
        edited,
      },
      {
        method: "PATCH",
      }
    );
    setEdit(false);
  }

  function handleCancelEdit() {
    setEdit(false);
    setEditText("");
  }
  const [output, setOutput] = useState("");

  let { isLoading, error, done, trigger, responseTime } = useTranslate({
    target: target_lang,
    text: sourceText,
    data: output,
    setData: setOutput,
    savefetcher,
    editfetcher,
  });

  useEffectAfterFirstRender(() => {
    if (charCount === 0) {
      resetFetcher(editfetcher);
      setOutput("");
    }
  }, [charCount]);
  let inferenceId = savefetcher.data?.id;

  const handleReset = () => {
    setOutput("");
    setSourceText("");
    resetFetcher(translationFetcher);
    resetFetcher(editfetcher);
    setEdit(false);
  };

  function handleErrorClose() {
    resetFetcher(translationFetcher);
    resetFetcher(editfetcher);
  }
  let outputRef = useRef<HTMLDivElement>();

  return (
    <ToolWraper title="MT">
      {error && (
        <ErrorMessage
          message={error}
          handleClose={handleErrorClose}
          type="info"
        />
      )}
      <div className="rounded-[10px] mb-[100px] overflow-hidden border dark:border-[--card-border] border-dark_text-secondary">
        <LanguageInput
          setSourceText={setSourceText}
          data={output}
          setTranslated={setOutput}
          likefetcher={likefetcher}
          sourceText={debounceSourceText}
          detectFetcher={detectFetcher}
        />

        <div className="flex flex-col lg:flex-row ">
          <CardComponent focussed={true}>
            {limitMessage ? (
              <div className="text-gray-500">
                {limitMessage} <br /> thank you for using MonlamAI
              </div>
            ) : (
              <>
                <div className="flex relative h-auto min-h-[100px] lg:min-h-[40vh] w-full flex-1 flex-col justify-center">
                  <TextComponent
                    sourceText={sourceText}
                    setSourceText={setSourceText}
                    sourceLang={source_lang}
                  />
                  <CancelButton
                    onClick={handleReset}
                    hidden={!sourceText || sourceText === ""}
                  >
                    <RxCross2 size={16} />
                  </CancelButton>
                </div>
                {charCount > 0 && sourceText?.trim() !== "" && !edit && (
                  <div className="flex justify-between py-1.5 px-1 border-t border-t-dark_text-secondary dark:border-t-[--card-border]">
                    <CharacterSizeComponent
                      selectedTool={"text"}
                      charCount={charCount}
                      CHAR_LIMIT={CHAR_LIMIT}
                      MAX_SIZE_SUPPORT={MAX_SIZE_SUPPORT_DOC}
                    />
                    <SubmitButton
                      charCount={charCount}
                      CHAR_LIMIT={CHAR_LIMIT}
                      trigger={() => {
                        trigger();
                        outputRef.current?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }}
                      disabled={
                        detectFetcher.state !== "idle" ||
                        source_lang === "detect language"
                      }
                    />
                  </div>
                )}
              </>
            )}
          </CardComponent>
          <Devider />
          <CardComponent>
            <div
              ref={outputRef}
              className={`flex flex-1 min-h-[150px] md:min-h-[15vh] lg:min-h-[30vh] h-auto w-full flex-col gap-2
              ${
                target_lang === "bo"
                  ? "leading-loose tracking-wide"
                  : "font-poppins"
              } text-lg`}
            >
              {translationFetcher?.data?.error && (
                <ErrorMessage
                  message={translationFetcher?.data?.error}
                  handleClose={handleReset}
                  type="warning"
                />
              )}
              {edit && (
                <EditDisplay
                  editText={editText}
                  setEditText={setEditText}
                  targetLang={target_lang}
                />
              )}
              {sourceText !== "" && (
                <OutputDisplay
                  edit={edit}
                  editData={editData}
                  output={output}
                  animate={true}
                  targetLang={target_lang}
                />
              )}
              {isLoading && (
                <div className="flex flex-1 items-center justify-center">
                  <Spinner
                    size="xl"
                    className={"fill-secondary-500 dark:fill-primary-500"}
                  />
                </div>
              )}
            </div>
            {edit && (
              <EditActionButtons
                handleCancelEdit={handleCancelEdit}
                handleEditSubmit={handleEditSubmit}
                editfetcher={editfetcher}
                editText={editText}
                outputText={output}
              />
            )}
            {!edit && inferenceId && sourceText !== "" && (
              <NonEditButtons
                likefetcher={likefetcher}
                sourceText={sourceText}
                inferenceId={inferenceId}
                setEdit={setEdit}
                text={newText ?? output}
                handleCopy={handleCopy}
                setEditText={setEditText}
                sourceLang={source_lang}
              />
            )}
          </CardComponent>
        </div>
      </div>
    </ToolWraper>
  );
}

export { ErrorBoundary };

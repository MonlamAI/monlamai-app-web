import type {
  ActionFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import {
  ClientLoaderFunctionArgs,
  isRouteErrorResponse,
  useFetcher,
  useLoaderData,
  useNavigate,
  useRouteError,
  useRouteLoaderData,
  useSearchParams,
} from "@remix-run/react";
import { useState, useRef, useEffect } from "react";
import useDebounce from "~/component/hooks/useDebounceState";
import ErrorMessage from "~/component/ErrorMessage";
import ToolWraper from "~/component/ToolWraper";
import DownloadDocument from "~/routes/model.mt/components/DownloadDocument";
import { toast } from "react-toastify";
import {
  getTodayInferenceByUserIdCountModel,
  getUserFileInferences,
  saveInference,
  updateEdit,
} from "~/modal/inference.server";
import ListInput from "~/component/ListInput";
import { API_ERROR_MESSAGE, MAX_SIZE_SUPPORT_DOC } from "~/helper/const";
import {
  CharacterOrFileSizeComponent,
  EditActionButtons,
  InferenceList,
  OutputDisplay,
  SubmitButton,
  TextOrDocumentComponent,
} from "./components/UtilityComponent";
import { NonEditButtons, NonEditModeActions } from "~/component/ActionButtons";
import EditDisplay from "~/component/EditDisplay";
import CardComponent from "~/component/Card";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { getUser } from "~/modal/user.server";
import { resetFetcher } from "~/component/utils/resetFetcher";
import LanguageInput from "./components/LanguageInput";
import { CancelButton } from "~/component/Buttons";
import { RxCross2 } from "react-icons/rx";
import useTranslate from "./lib/useTranslate";
import { getUserSession } from "~/services/session.server";
import ImageTranslateComponent from "./components/ImageTranslateComponent";
export const meta: MetaFunction<typeof loader> = ({ matches }) => {
  const parentMeta = matches.flatMap((match) => match.meta ?? []);
  parentMeta.shift(1);
  return [{ title: "Monlam | ཡིག་སྒྱུར་རིག་ནུས།" }, ...parentMeta];
};

export async function loader({ request }: LoaderFunctionArgs) {
  let userdata = await getUserSession(request);
  let user = await getUser(userdata?._json.email);
  let checkNumberOfInferenceToday = user
    ? await getTodayInferenceByUserIdCountModel(user?.id, "mt")
    : null;
  let checkLimit = checkNumberOfInferenceToday
    ? checkNumberOfInferenceToday >= parseInt(process.env?.API_HIT_LIMIT!)
    : false;
  let CHAR_LIMIT = parseInt(process.env?.MAX_TEXT_LENGTH_MT!);
  let limitMessage =
    "You have reached the daily limit of translation. Please try again tomorrow.";

  let inferences = await getUserFileInferences({
    userId: user?.id,
    model: "mt",
  });
  const userAgent = request.headers.get("User-Agent") || "";

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );
  return {
    user: userdata,
    limitMessage: checkLimit ? limitMessage : null,
    url: process.env?.MT_API_URL,
    token: process.env?.MODEL_API_AUTH_TOKEN,
    fileUploadUrl: process.env?.FILE_SUBMIT_URL,
    inferences,
    CHAR_LIMIT,
    isMobile,
  };
}

export const action: ActionFunction = async ({ request }) => {
  let formdata = await request.formData();
  let userdata = await getUserSession(request);
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
      inputLang: inputLang,
      outputLang: outputLang,
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
  const selectedTool = params.get("tool") || "text";
  const setSelectedTool = (tool: string) => {
    setParams((p) => {
      p.set("tool", tool);
      return p;
    });
  };

  const [file, setFile] = useState<File | null>(null);
  const { limitMessage, CHAR_LIMIT, user } = useLoaderData();
  const { show_mt_language_toggle } = useRouteLoaderData("root");
  const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState("");
  const [inputUrl, setInputUrl] = useState("");

  const debounceSourceText = useDebounce(sourceText, 100);
  const likefetcher = useFetcher();
  const editfetcher = useFetcher();
  const translationFetcher = useFetcher();

  const savefetcher = useFetcher();
  const targetRef = useRef<HTMLDivElement>(null);
  const editData = editfetcher.data?.edited;

  let charCount = sourceText?.length;

  function handleCopy() {
    navigator.clipboard.writeText(data);
  }

  useEffect(() => {
    setSourceText("");
  }, [selectedTool]);

  let TextSelected = selectedTool === "text";
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
  const [data, setData] = useState("");

  let { isLoading, error, done, trigger } = useTranslate({
    target: target_lang,
    text: debounceSourceText,
    data,
    setData,
  });
  useEffect(() => {
    if (done === true && data) {
      savefetcher.submit(
        {
          source: debounceSourceText,
          translation: data,
          responseTime: 5,
          inputLang: source_lang,
          targetLang: target_lang,
        },
        {
          method: "POST",
        }
      );
      resetFetcher(editfetcher);
    }
  }, [done]);
  let inferenceId = savefetcher.data?.id;

  const handleReset = () => {
    setData("");
    setSourceText("");
    resetFetcher(translationFetcher);
    resetFetcher(editfetcher);
  };

  const handleFileSubmit = () => {
    let formdata = new FormData();
    formdata.append("fileUrl", inputUrl);
    formdata.append("target", target_lang as string);

    translationFetcher.submit(formdata, {
      method: "POST",
      action: "/mtFileUpload",
    });
  };

  return (
    <ToolWraper title="MT">
      <ListInput
        options={["text", "document"]}
        selectedTool={selectedTool}
        setSelectedTool={setSelectedTool}
      />
      {error && <ErrorMessage error={error} />}
      {show_mt_language_toggle ? (
        <LanguageSwitcher
          data={data}
          setSourceText={setSourceText}
          setTranslated={setData}
          likefetcher={likefetcher}
        />
      ) : (
        <LanguageInput
          setSourceText={setSourceText}
          data={data}
          setTranslated={setData}
          likefetcher={likefetcher}
          sourceText={debounceSourceText}
        />
      )}

      {(selectedTool === "text" || selectedTool === "document") && (
        <div className="mt-3 flex flex-col gap-5 lg:flex-row">
          <>
            <CardComponent>
              {limitMessage ? (
                <div className="text-gray-500">
                  {limitMessage} <br /> thank you for using MonlamAI
                </div>
              ) : (
                <>
                  <div className="flex relative h-auto md:min-h-[25vh] lg:min-h-[40vh] w-full flex-1 flex-col justify-center gap-2">
                    <TextOrDocumentComponent
                      selectedTool={selectedTool}
                      sourceText={sourceText}
                      setSourceText={setSourceText}
                      sourceLang={source_lang}
                      setFile={setFile}
                      setInputUrl={setInputUrl}
                    />
                    {selectedTool === "text" && (
                      <CancelButton
                        onClick={handleReset}
                        hidden={!sourceText || sourceText === ""}
                      >
                        <RxCross2 size={20} />
                      </CancelButton>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <CharacterOrFileSizeComponent
                      selectedTool={selectedTool}
                      charCount={charCount}
                      CHAR_LIMIT={CHAR_LIMIT}
                      MAX_SIZE_SUPPORT={MAX_SIZE_SUPPORT_DOC}
                    />
                    <SubmitButton
                      charCount={charCount}
                      CHAR_LIMIT={CHAR_LIMIT}
                      trigger={trigger}
                      selectedTool={selectedTool}
                      submitFile={handleFileSubmit}
                      disabled={!file || file.length === 0}
                    />
                  </div>
                </>
              )}
            </CardComponent>
            <CardComponent>
              <div className="flex min-h-[15vh] lg:min-h-[30vh] h-auto w-full flex-1 flex-col gap-2 ">
                <div
                  ref={targetRef}
                  className={`h-full text-lg ${
                    target_lang === "bo"
                      ? "leading-loose tracking-wide"
                      : "font-poppins"
                  }`}
                >
                  {translationFetcher?.data?.error && (
                    <ErrorMessage
                      message={translationFetcher?.data?.error}
                      handleClose={handleReset}
                    />
                  )}
                  {TextSelected && edit && (
                    <EditDisplay
                      editText={editText}
                      setEditText={setEditText}
                    />
                  )}
                  {TextSelected && sourceText !== "" && (
                    <OutputDisplay
                      edit={edit}
                      editData={editData}
                      output={data}
                      animate={true}
                      targetLang={target_lang}
                    />
                  )}
                  {selectedTool === "document" && <InferenceList />}
                  {isLoading && (
                    <div className="w-full flex justify-center">
                      <div className=" loader_animation"></div>
                    </div>
                  )}
                  {selectedTool === "document" && sourceText !== "" && (
                    <DownloadDocument source={sourceText} lang={source_lang} />
                  )}
                </div>
              </div>
              {edit && (
                <EditActionButtons
                  handleCancelEdit={handleCancelEdit}
                  handleEditSubmit={handleEditSubmit}
                  editfetcher={editfetcher}
                  editText={editText}
                  outputText={data}
                />
              )}
              {!edit && inferenceId && sourceText !== "" && (
                <NonEditButtons
                  selectedTool={selectedTool}
                  likefetcher={likefetcher}
                  sourceText={sourceText}
                  inferenceId={inferenceId}
                  setEdit={setEdit}
                  text={newText ?? data}
                  handleCopy={handleCopy}
                  setEditText={setEditText}
                  sourceLang={source_lang}
                />
              )}
            </CardComponent>
          </>
        </div>
      )}
      {selectedTool === "image" && <ImageTranslateComponent />}

      <div className="mt-3 w-full text-center text-[0.7rem] text-xs text-slate-400 md:float-right md:w-fit">
        Monlam-MITRA ཡིག་སྒྱུར་རིག་ནུས་དཔེ་གཞི་ཐོན་རིམ་ <small>v</small>10-16
      </div>
    </ToolWraper>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  let isRouteError = isRouteErrorResponse(error);
  const navigate = useNavigate();

  useEffect(() => {
    toast.warn(API_ERROR_MESSAGE, {
      position: toast.POSITION.TOP_RIGHT,
      style: {
        top: "5rem",
      },
    });
    navigate(".", { replace: true });
  }, []);

  return <>{/* <ErrorMessage error={"error"} /> */}</>;
}

import type {
  ActionFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import {
  isRouteErrorResponse,
  useFetcher,
  useNavigate,
  useRouteError,
} from "@remix-run/react";
import { Button, Card, Textarea } from "flowbite-react";
import { useState, useRef, useEffect } from "react";
import { auth } from "~/services/auth.server";
import useDebounce from "~/component/hooks/useDebounceState";
import useLocalStorage from "~/component/hooks/useLocaleStorage";
import ErrorMessage from "~/component/ErrorMessage";
import ToolWraper from "~/component/ToolWraper";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
import DownloadDocument from "~/routes/model.mt/components/DownloadDocument";
import { toast } from "react-toastify";
import { updateEdit } from "~/modal/inference.server";
import ListInput from "~/component/ListInput";
import { CHAR_LIMIT, MAX_SIZE_SUPPORT } from "~/helper/const";
import LanguageSwitcher from "./components/LanguageSwitcher";
import {
  CharacterOrFileSizeComponent,
  EditActionButtons,
  LoadingAnimation,
  OutputDisplay,
  TextOrDocumentComponent,
} from "./components/UtilityComponent";
import { NonEditModeActions } from "~/component/ActionButtons";
import EditDisplay from "~/component/EditDisplay";
import { resetFetcher } from "~/component/utils/resetFetcher";

export const meta: MetaFunction<typeof loader> = ({ matches }) => {
  const parentMeta = matches.flatMap((match) => match.meta ?? []);
  parentMeta.shift(1);
  return [{ title: "Monlam | ཡིག་སྒྱུར་རིག་ནུས།" }, ...parentMeta];
};

export async function loader({ request }: LoaderFunctionArgs) {
  let userdata = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  return { user: userdata };
}

export const action: ActionFunction = async ({ request }) => {
  let formdata = await request.formData();
  let edited = formdata.get("edited") as string;
  let inferenceId = formdata.get("inferenceId") as string;
  let updated = await updateEdit(inferenceId, edited);

  return updated;
};

export default function Index() {
  const fetcher = useFetcher();
  const [sourceLang, setSourceLang] = useLocalStorage("inputLang", "en");
  const [targetLang, setTargetLang] = useLocalStorage("outputLang", "bo");
  const [sourceText, setSourceText] = useState("");
  const [selectedTool, setSelectedTool] = useLocalStorage(
    "mt_selected_input",
    "text"
  );
  const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState("");
  const [direction, setDirection] = useState("bo");

  const debouncedSearchTerm = useDebounce(sourceText, 1000);
  const debouncedDirection = useDebounce(direction, 2000);
  const likefetcher = useFetcher();
  const editfetcher = useFetcher();

  const targetRef = useRef<HTMLDivElement>(null);
  const editData = editfetcher.data?.edited;

  let charCount = sourceText?.length;
  let { translation } = uselitteraTranlation();
  function handleCopy() {
    let textToCopy = translated?.translation;
    navigator.clipboard.writeText(textToCopy);
  }

  useEffect(() => {
    setSourceText("");
  }, [selectedTool]);

  useEffect(() => {
    if (debouncedSearchTerm === "" || !debouncedSearchTerm) return;
    setEdit(false);
    resetFetcher(editfetcher);

    fetcher.submit(
      {
        input: debouncedSearchTerm,
        lang: sourceLang,
        direction,
      },
      {
        action: "/api/translation",
        method: "POST",
      }
    );
  }, [debouncedSearchTerm, debouncedDirection]);

  let data = fetcher?.data;
  let isloading = fetcher.state !== "idle";
  let inferenceId = data?.inferenceData?.id;
  let translated = data?.translation;
  let TextSelected = selectedTool === "text";
  let actionError = data?.error as string;

  function handleEditSubmit() {
    let edited = editText;
    editfetcher.submit(
      {
        inferenceId,
        edited,
      },
      {
        method: "POST",
      }
    );
    setEdit(false);
  }
  function handleCancelEdit() {
    setEdit(false);
    setEditText("");
  }
  return (
    <ToolWraper title="MT">
      <ListInput
        options={["text", "document"]}
        selectedTool={selectedTool}
        setSelectedTool={setSelectedTool}
      />
      {actionError && <ErrorMessage error={actionError} />}
      {/* <LanguageSwitcher
        sourceLang={sourceLang}
        targetLang={targetLang}
        likefetcher={likefetcher}
        setSourceLang={setSourceLang}
        setSourceText={setSourceText}
        setTargetLang={setTargetLang}
      /> */}
      <div className="flex flex-col md:flex-row gap-2 mt-2 ">
        <span className="mt-2">Translate into </span>
        <input
          value={direction}
          onChange={(e) => setDirection(e.target.value)}
          placeholder="eg. fr"
          className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mt-3 flex flex-col md:flex-row  gap-5">
        <Card className="md:w-1/2">
          <div className="w-full flex flex-col justify-center gap-2 min-h-[20vh]  flex-1 ">
            <TextOrDocumentComponent
              selectedTool={selectedTool}
              sourceText={sourceText}
              setSourceText={setSourceText}
              sourceLang={sourceLang}
            />
          </div>
          <Button
            color="gray"
            className="text-slate-500 md:hidden"
            onClick={() => setSourceText("")}
          >
            {translation.reset}
          </Button>
          <div className="md:mt-2 md:mb-3 flex justify-between items-end">
            <CharacterOrFileSizeComponent
              selectedTool={selectedTool}
              charCount={charCount}
              CHAR_LIMIT={CHAR_LIMIT}
              MAX_SIZE_SUPPORT={MAX_SIZE_SUPPORT}
            />
          </div>
        </Card>

        <Card className="md:w-1/2 ">
          <div className="w-full flex flex-col justify-center gap-2 min-h-[20vh]  flex-1 ">
            <div
              ref={targetRef}
              className={`h-full text-lg ${
                targetLang === "bo"
                  ? "tracking-wide leading-loose"
                  : "font-poppins"
              }`}
            >
              {TextSelected && isloading && <LoadingAnimation />}
              {TextSelected && edit && (
                <EditDisplay editText={editText} setEditText={setEditText} />
              )}
              {TextSelected && !isloading && (
                <OutputDisplay
                  edit={edit}
                  editData={editData}
                  output={translated?.translation ?? ""}
                  editText={editText}
                  setEditText={setEditText}
                />
              )}
              {selectedTool === "document" && (
                <DownloadDocument source={sourceText} lang={sourceLang} />
              )}
            </div>
          </div>
          {edit && (
            <EditActionButtons
              handleCancelEdit={handleCancelEdit}
              handleEditSubmit={handleEditSubmit}
              editfetcher={editfetcher}
              editText={editText}
              translated={translated}
            />
          )}
          {!edit && (
            <NonEditModeActions
              selectedTool={selectedTool}
              likefetcher={likefetcher}
              sourceText={sourceText}
              inferenceId={inferenceId}
              setEdit={setEdit}
              text={translated?.translation}
              handleCopy={handleCopy}
              setEditText={setEditText}
            />
          )}
        </Card>
      </div>
      <div className="w-full text-center md:w-fit md:float-right text-xs mt-3 text-slate-400 text-[0.7rem]">
        Monlam-MITRA ཡིག་སྒྱུར་རིག་ནུས་དཔེ་གཞི་ཐོན་རིམ་ <small>v</small>10-16
      </div>
    </ToolWraper>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  let isRouteError = isRouteErrorResponse(error);
  const navigate = useNavigate();

  console.log(isRouteError);
  useEffect(() => {
    toast.warn("འདིར་དཀའ་ངལ་འདུག [error with api, try after sometime]", {
      position: toast.POSITION.TOP_RIGHT,
      style: {
        top: "5rem",
      },
    });
    navigate(".", { replace: true });
  }, []);

  return <>{/* <ErrorMessage error={"error"} /> */}</>;
}

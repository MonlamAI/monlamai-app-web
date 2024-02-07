import type {
  ActionFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import {
  isRouteErrorResponse,
  useFetcher,
  useLoaderData,
  useNavigate,
  useRouteError,
  useRouteLoaderData,
  useSearchParams,
} from "@remix-run/react";
import { Button, Card } from "flowbite-react";
import { useState, useRef, useEffect } from "react";
import { auth } from "~/services/auth.server";
import useDebounce from "~/component/hooks/useDebounceState";
import useLocalStorage from "~/component/hooks/useLocaleStorage";
import ErrorMessage from "~/component/ErrorMessage";
import ToolWraper from "~/component/ToolWraper";
import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";
import DownloadDocument from "~/routes/model.mt/components/DownloadDocument";
import { toast } from "react-toastify";
import { saveInference, updateEdit } from "~/modal/inference.server";
import ListInput from "~/component/ListInput";
import {
  API_ERROR_MESSAGE,
  CHAR_LIMIT,
  MAX_SIZE_SUPPORT,
} from "~/helper/const";
import {
  CharacterOrFileSizeComponent,
  EditActionButtons,
  OutputDisplay,
  TextOrDocumentComponent,
} from "./components/UtilityComponent";
import { NonEditModeActions } from "~/component/ActionButtons";
import EditDisplay from "~/component/EditDisplay";
import CardComponent from "~/component/Card";
import LanguageSwitcher from "./components/LanguageSwitcher";
import useTranslate from "./lib/useTranslate";
import { getUser } from "~/modal/user.server";
import { resetFetcher } from "~/component/utils/resetFetcher";
import LanguageInput from "./components/LanguageInput";

export const meta: MetaFunction<typeof loader> = ({ matches }) => {
  const parentMeta = matches.flatMap((match) => match.meta ?? []);
  parentMeta.shift(1);
  return [{ title: "Monlam | ཡིག་སྒྱུར་རིག་ནུས།" }, ...parentMeta];
};

export async function loader({ request }: LoaderFunctionArgs) {
  let userdata = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  const url = process.env?.MT_API_URL;
  let modelToken = process.env?.MODEL_API_AUTH_TOKEN;

  return { user: userdata, url, modelToken };
}

export const action: ActionFunction = async ({ request }) => {
  let formdata = await request.formData();
  let userdata = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  let user = await getUser(userdata?._json.email);

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

export default function Index() {
  const [params, setParams] = useSearchParams();
  const target_lang = params.get("target") || "bo";
  const source_lang = params.get("source") || "en";
  const [sourceText, setSourceText] = useState("");
  const [selectedTool, setSelectedTool] = useLocalStorage(
    "mt_selected_input",
    "text"
  );

  const { url, modelToken } = useLoaderData();
  const { show_mt_language_toggle } = useRouteLoaderData("root");
  const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState("");
  const debounceSourceText = useDebounce(sourceText, 1000);
  const likefetcher = useFetcher();
  const editfetcher = useFetcher();
  const savefetcher = useFetcher();

  const targetRef = useRef<HTMLDivElement>(null);
  const editData = editfetcher.data?.edited;

  let charCount = sourceText?.length;
  let { translation } = uselitteraTranlation();
  function handleCopy() {
    navigator.clipboard.writeText(data);
  }

  useEffect(() => {
    setSourceText("");
  }, [selectedTool]);

  let { data, isLoading, error, done } = useTranslate({
    url,
    token: modelToken,
    target: target_lang,
    text: debounceSourceText,
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
  }, [done, data]);
  let inferenceId = savefetcher.data?.id;
  let TextSelected = selectedTool === "text";
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
          onClick={() => {
            if (!!editText) setSourceText(editText);
            else setSourceText(data);
          }}
          setSourceText={setSourceText}
          likefetcher={likefetcher}
        />
      ) : (
        <LanguageInput />
      )}

      <div className="mt-3 flex flex-col md:flex-row gap-5">
        <CardComponent className="md:w-1/2">
          <div className="w-full flex flex-col justify-center gap-2 min-h-[30vh] flex-1 ">
            <TextOrDocumentComponent
              selectedTool={selectedTool}
              sourceText={sourceText}
              setSourceText={setSourceText}
              sourceLang={source_lang}
            />
          </div>
          <Button
            color="gray"
            className="text-slate-500 md:hidden"
            onClick={() => setSourceText("")}
          >
            {translation.reset}
          </Button>
          <CharacterOrFileSizeComponent
            selectedTool={selectedTool}
            charCount={charCount}
            CHAR_LIMIT={CHAR_LIMIT}
            MAX_SIZE_SUPPORT={MAX_SIZE_SUPPORT}
          />
        </CardComponent>

        <CardComponent className="md:w-1/2">
          <div className="w-full flex flex-col gap-2 min-h-[30vh] flex-1 ">
            <div
              ref={targetRef}
              className={`h-full text-lg ${
                target_lang === "bo"
                  ? "tracking-wide leading-loose"
                  : "font-poppins"
              }`}
            >
              {TextSelected && edit && (
                <EditDisplay editText={editText} setEditText={setEditText} />
              )}
              {isLoading && <div>loading</div>}
              {TextSelected && sourceText !== "" && !isLoading && (
                <OutputDisplay
                  edit={edit}
                  editData={editData}
                  output={data}
                  animate={true}
                />
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
              translated={data}
            />
          )}
          {!edit && inferenceId && sourceText !== "" && (
            <NonEditModeActions
              selectedTool={selectedTool}
              likefetcher={likefetcher}
              sourceText={sourceText}
              inferenceId={inferenceId}
              setEdit={setEdit}
              text={data}
              handleCopy={handleCopy}
              setEditText={setEditText}
            />
          )}
        </CardComponent>
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

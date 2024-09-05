import uselitteraTranlation from "~/component/hooks/useLitteraTranslation";

type CharacterOrFileSizeComponentProps = {
  selectedTool: string;
  charCount: number | string;
  CHAR_LIMIT: number | undefined;
  MAX_SIZE_SUPPORT: string;
};

export function CharacterSizeComponent({
  selectedTool,
  charCount,
  CHAR_LIMIT,
  MAX_SIZE_SUPPORT,
}: CharacterOrFileSizeComponentProps) {
  const { translation, isTibetan } = uselitteraTranlation();
  return (
    <div
      className={`text-gray-400 text-xs p-2 ${
        isTibetan ? "font-monlam" : "font-poppins"
      }`}
    >
      {selectedTool === "recording" && `${translation.duration} : ` + charCount}
      {selectedTool === "text" && typeof charCount === "number" && (
        <>
          <span style={{ color: charCount > CHAR_LIMIT! ? "red" : "inherit" }}>
            {charCount}
          </span>{" "}
          / {CHAR_LIMIT}
        </>
      )}
      {selectedTool !== "recording" && selectedTool !== "text" && (
        <div className="text-gray-400 text-xs p-2">
          max size: {MAX_SIZE_SUPPORT}
        </div>
      )}
    </div>
  );
}

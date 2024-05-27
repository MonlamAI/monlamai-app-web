export function SelectionList({ handleSelect, currentState }) {
  function handleChange(data) {
    handleSelect(data);
  }

  return (
    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
      <li className="me-2" onClick={() => handleChange("user")}>
        <div
          className={`inline-block p-4  rounded-t-lg active ${
            currentState === "user" &&
            "text-blue-600 bg-gray-100 dark:bg-gray-800 dark:text-blue-500"
          }`}
        >
          Users
        </div>
      </li>
      <li className="me-2" onClick={() => handleChange("inferenceCount")}>
        <div
          className={`inline-block p-4  rounded-t-lg active ${
            currentState === "inferenceCount" &&
            "text-blue-600 bg-gray-100 dark:bg-gray-800 dark:text-blue-500"
          }`}
        >
          Inference Count
        </div>
      </li>
      <li className="me-2" onClick={() => handleChange("inferenceList")}>
        <div
          className={`inline-block p-4  rounded-t-lg active ${
            currentState === "inferenceList" &&
            "text-blue-600 bg-gray-100 dark:bg-gray-800 dark:text-blue-500"
          }`}
        >
          Inference List
        </div>
      </li>
    </ul>
  );
}

import React, { useState } from "react";
import { Virtuoso } from "react-virtuoso";
import Papa from "papaparse";
import { DateRangePicker } from "react-date-range";
import { startOfMonth, endOfMonth, format } from "date-fns";
import { useNavigation, useSearchParams } from "@remix-run/react";
import { Spinner } from "flowbite-react";

const InferenceList = ({ inferences }) => {
  const [param, setParam] = useSearchParams();
  const navigation = useNavigation();
  let isLoading = navigation.state !== "idle";
  const [filterUserId, setFilterUserId] = useState("");
  const [filterModel, setFilterModel] = useState("");
  let filterDates = [
    {
      startDate: new Date(param.get("startDate")) ?? startOfMonth(new Date()),
      endDate: new Date(param.get("endDate")) ?? endOfMonth(new Date()),
      key: "selection",
    },
  ];
  const [isDateModalOpen, setDateModalOpen] = useState(false);
  const handleSelect = (ranges) => {
    setParam((p) => {
      p.set("startDate", ranges.selection.startDate);
      p.set("endDate", ranges.selection.endDate);
      return p;
    });
  };

  const filteredInferences = inferences.filter((inference) => {
    return (
      (filterUserId ? inference.userId === parseInt(filterUserId) : true) &&
      (filterModel ? inference.model === filterModel : true)
    );
  });

  const downloadCSV = () => {
    const csv = Papa.unparse(filteredInferences, {
      columns: [
        "id",
        "model",
        "modelVersion",
        "input",
        "output",
        "updatedAt",
        "userId",
      ],
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "inferences.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openDateModal = () => setDateModalOpen(true);
  const closeDateModal = () => setDateModalOpen(false);
  return (
    <div className="container mx-auto p-4">
      <div className="flex gap-4 mb-4">
        <button
          onClick={openDateModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Date Filter
        </button>
        <Modal isOpen={isDateModalOpen} onClose={closeDateModal}>
          <DateRangePicker
            ranges={[filterDates[0]]}
            onChange={handleSelect}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            direction="horizontal"
          />
        </Modal>
        <input
          type="number"
          placeholder="Filter by User ID"
          className="border p-2"
          value={filterUserId}
          onChange={(e) => setFilterUserId(e.target.value)}
        />
        <select
          className="border p-2"
          value={filterModel}
          onChange={(e) => setFilterModel(e.target.value)}
        >
          <option value="">All Models</option>
          <option value="mt">MT</option>
          <option value="stt">STT</option>
          <option value="tts">TTS</option>
          <option value="ocr">OCR</option>
        </select>
        <button
          onClick={downloadCSV}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Download CSV
        </button>
      </div>
      {isLoading && (
        <div>
          <Spinner />
        </div>
      )}
      <Virtuoso
        style={{ height: "600px", width: "100%" }}
        data={filteredInferences}
        itemContent={(index, inference) => (
          <div className="p-4 shadow mb-4">
            <h2 className="text-lg font-bold">Inference ID: {inference.id}</h2>
            <p>Model: {inference.model}</p>
            <p>Version: {inference.modelVersion}</p>
            <p>Input: {inference.input}</p>
            <p>Output: {inference.output}</p>
            <p>
              Last Updated:{" "}
              {format(new Date(inference.updatedAt), "yyyy-MM-dd")}
            </p>
            <p>User ID: {inference.userId}</p>
          </div>
        )}
      />
    </div>
  );
};

export default InferenceList;

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg ">
        {children}
        <button
          onClick={onClose}
          className="mt-4 ml-2 px-4 py-2 bg-red-500 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

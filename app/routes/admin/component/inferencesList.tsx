import React, { useState } from "react";
import { Virtuoso } from "react-virtuoso";
import Papa from "papaparse";
import { DateRangePicker } from "react-date-range";
import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  format,
} from "date-fns";

const InferenceList = ({ inferences }) => {
  const [filterDates, setFilterDates] = useState([
    {
      startDate: startOfMonth(new Date()),
      endDate: endOfMonth(new Date()),
      key: "selection",
    },
  ]);
  const [filterUserId, setFilterUserId] = useState("");
  const [filterModel, setFilterModel] = useState("");
  const [monthly, setMonthly] = useState(false);

  const [isDateModalOpen, setDateModalOpen] = useState(false);
  const handleSelect = (ranges) => {
    setFilterDates([ranges.selection]);
  };

  const filteredInferences = inferences.filter((inference) => {
    const infDate = new Date(inference.updatedAt);
    const startDate = monthly
      ? startOfMonth(filterDates[0].startDate)
      : filterDates[0].startDate;
    const endDate = monthly
      ? endOfMonth(filterDates[0].endDate)
      : filterDates[0].endDate;
    return (
      infDate >= startDate &&
      infDate <= endDate &&
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
          <option value="MT">MT</option>
          <option value="STT">STT</option>
          <option value="TTS">TTS</option>
          <option value="OCR">OCR</option>
        </select>
        <button
          onClick={downloadCSV}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Download CSV
        </button>
      </div>

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

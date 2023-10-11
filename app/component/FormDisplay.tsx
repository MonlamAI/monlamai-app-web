import React from "react";
import { Form } from "@remix-run/react";

type inputFieldType = {
  name: string;
  placeholder: string;
};

type textareFieldType = {
  name: string;
  label: string;
  placeholder: string;
};


function FormDisplay() {
  let inputFields: inputFieldType[] = [
    {
      name: "name",
      placeholder: "Your name",
    },
    {
      name: "organisation",
      placeholder: "Your organisation",
    },
  ];

  let textareaFields: textareFieldType[] = [
    {
      name: "mtPurpose",
      label: "Purpose of using MT Model:",
      placeholder: "MT purpose",
    },
    {
      name: "ocrPurpose",
      label: "Purpose of using OCR Model:",
      placeholder: "OCR purpose",
    },
    {
      name: "sttPurpose",
      label: "Purpose of using STT Models:",
      placeholder: "STT purpose",
    },
  ];

  return (
    <>
      <div className="h-screen text-white py-[160px] w-[90%] md:w-[80%] lg:w-[60%] m-auto">
        <div className="max-w-[500px] m-auto">
          <Form
            method="post"
            className="p-6 shadow-md shadow-slate-300 rounded-xl"
          >
            {inputFields.map((inputField, index) => (
              <div className="form-control mb-4" key={index}>
                <label htmlFor={inputField.name} className="label capitalize">
                  {inputField.name}
                </label>
                <input
                  type="text"
                  id={inputField.name}
                  name={inputField.name}
                  required
                  placeholder={inputField.placeholder}
                  className="input input-bordered w-full text-black"
                />
              </div>
            ))}

            {/* <!-- Purpose fields --> */}
            {textareaFields.map((textareaField, index) => (
              <div className="form-control mb-4" key={index}>
                <label htmlFor={textareaField.name} className="label">
                  {textareaField.label}
                </label>
                <textarea
                  id={textareaField.name}
                  name={textareaField.name}
                  required
                  className="textarea textarea-bordered w-full text-black"
                  placeholder={textareaField.placeholder}
                ></textarea>
              </div>
            ))}
            {/* <!-- Submit button --> */}
            <button type="submit" className="btn mt-4 w-full">
              Submit
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default FormDisplay;

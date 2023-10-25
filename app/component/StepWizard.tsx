import { useFetcher } from "@remix-run/react";
import { Button, Label, TextInput, Select } from "flowbite-react";
import React from "react";
import FormWizard from "react-form-wizard-component";
import TermsAndContitions from "~/component/TermsAndConditions";

import SelectOptions from "./SelectOptions";

function StepWizard() {
  const [organization, setOrganization] = React.useState("");
  const [profession, setProfession] = React.useState("");
  const [q1, setQ1] = React.useState("");
  const [q2, setQ2] = React.useState("");
  const [q3, setQ3] = React.useState("");
  const [q4, setQ4] = React.useState("");

  const fetcher = useFetcher();

  const handleComplete = () => {
    fetcher.submit(
      {
        organization,
        profession,
        q1,
        q2,
        q3,
        q4,
      },
      {
        method: "POST",
      }
    );
  };

  // check validate tab
  const checkValidateTab1 = () => {
    if (organization === "" || profession === "") {
      return false;
    }
    return true;
  };

  const checkValidateTab2 = () => {
    if (q1 === "" || q2 === "" || q3 === "" || q4 === "") {
      return false;
    }
    return true;
  };
  // error messages
  const errorMessages = () => {
    // you can add alert or console.log or any thing you want
    alert("Please fill in the required fields");
  };

  return (
    <div>
      <FormWizard
        stepSize="sm"
        onComplete={handleComplete}
        backButtonTemplate={(handleNext) => (
          <Button className="base-button float-left mt-2" onClick={handleNext}>
            ཕྱིར་ལོག།
          </Button>
        )}
        nextButtonTemplate={(handleNext) => (
          <Button className="base-button float-right mt-2" onClick={handleNext}>
            རྗེས་མ།
          </Button>
        )}
        finishButtonTemplate={(handleComplete) => (
          <Button
            className="finish-button float-right  mt-2"
            onClick={handleComplete}
          >
            མོས་མཐུན་ཡོད།
          </Button>
        )}
      >
        <FormWizard.TabContent
          title="མི་སྒེར་གྱི་ཆ་འཕྲིན་ཞིབ་ཕྲ།"
          icon="ti-user"
        >
          <div className="max-w-md mx-auto flex flex-col gap-3 md:min-h-[50dvh] mt-5">
            <Label htmlFor="organizationInput">
              ཚོགས་པ།
              <span
                style={{ color: "red", fontSize: "20px", fontWeight: "bold" }}
              >
                *
              </span>
            </Label>
            <TextInput
              id="organizationInput"
              required
              type="text"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
            />
            <Label htmlFor="professionInput">
              ལས་གནས།
              <span
                style={{ color: "red", fontSize: "20px", fontWeight: "bold" }}
              >
                *
              </span>
            </Label>
            <TextInput
              id="professionInput"
              required
              type="text"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
            />
          </div>
        </FormWizard.TabContent>
        <FormWizard.TabContent
          title="རིག་ནུས་བཀོལ་སྤྱོད།"
          icon="ti-settings"
          isValid={checkValidateTab1()}
          validationError={errorMessages}
        >
          <div className="mx-auto flex max-w-md flex-col gap-4 md:min-h-[50dvh] mt-5">
            <SelectOptions option="q1" value={q1} setValue={setQ1} />
            <SelectOptions option="q2" value={q2} setValue={setQ2} />
            <SelectOptions option="q3" value={q3} setValue={setQ3} />
            <SelectOptions option="q4" value={q4} setValue={setQ4} />
          </div>
        </FormWizard.TabContent>
        <FormWizard.TabContent
          title="བཀོལ་སྤྱོད་ཆ་རྐྱེན།"
          icon="ti-check"
          isValid={checkValidateTab2()}
          validationError={errorMessages}
        >
          <div className="mx-auto w-full lg:max-w-screen-md max-h-[500vh] overflow-auto">
            <TermsAndContitions />
          </div>
        </FormWizard.TabContent>
      </FormWizard>
    </div>
  );
}

export default StepWizard;

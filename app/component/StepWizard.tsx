import { useFetcher } from "@remix-run/react";
import { Button, Label, TextInput, Select } from "flowbite-react";
import React from "react";
import FormWizard from "react-form-wizard-component";
import TermsAndContitions from "~/component/TermsAndConditions";

import Questions from "./Questions";
import uselitteraTranlation from "./hooks/useLitteraTranslation";

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
  let translation = uselitteraTranlation();
  return (
    <div className=" mx-auto">
      <FormWizard
        stepSize="sm"
        onComplete={handleComplete}
        backButtonTemplate={(handleback) => (
          <Button
            className="base-button  w-lg mx-auto mt-5"
            onClick={handleback}
          >
            {translation.back}
          </Button>
        )}
        nextButtonTemplate={(handleNext) => (
          <Button
            className="base-button  w-lg mx-auto mt-5"
            onClick={handleNext}
          >
            {translation.next}
          </Button>
        )}
        finishButtonTemplate={(handleComplete) => (
          <Button
            className="base-button  w-lg mx-auto mt-5"
            onClick={handleComplete}
          >
            {translation.agree}
          </Button>
        )}
      >
        <FormWizard.TabContent
          title={translation.personalInformation}
          icon="ti-user"
        >
          <div className="max-w-md mx-auto flex flex-col gap-3  mt-5">
            <Label htmlFor="organizationInput">
              {translation.organisation}
              <span className="text-red-500 text-[20px] ml-1">*</span>
            </Label>
            <TextInput
              id="organizationInput"
              required
              placeholder="དཔེར་ན་ སྨན་རྩིས་ཁང་།"
              type="text"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
            />
            <Label htmlFor="professionInput">
              {translation.profession}
              <span className="text-red-500 text-[20px] ml-1">*</span>
            </Label>
            <TextInput
              id="professionInput"
              placeholder="དཔེར་ན་ སྨན་པ།"
              required
              type="text"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
            />
          </div>
        </FormWizard.TabContent>
        <FormWizard.TabContent
          title={translation.toolUsage}
          icon="ti-settings"
          isValid={checkValidateTab1()}
          validationError={errorMessages}
        >
          <div className="mx-auto flex max-w-md flex-col gap-4 md:min-h-[50dvh] mt-5">
            <Questions option="q1" value={q1} setValue={setQ1} />
            <Questions option="q2" value={q2} setValue={setQ2} />
            <Questions option="q3" value={q3} setValue={setQ3} />
            <Questions option="q4" value={q4} setValue={setQ4} />
          </div>
        </FormWizard.TabContent>
        <FormWizard.TabContent
          title={translation.TermsAndConditions}
          icon="ti-check"
          isValid={checkValidateTab2()}
          validationError={errorMessages}
        >
          <TermsAndContitions />
        </FormWizard.TabContent>
      </FormWizard>
    </div>
  );
}

export default StepWizard;

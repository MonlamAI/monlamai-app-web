import { useFetcher } from "@remix-run/react";
import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import FormWizard from "react-form-wizard-component";
import TermsAndContitions from "~/component/TermsAndConditions";

function StepWizard() {
  const [organization, setOrganization] = React.useState("");
  const [profession, setProfession] = React.useState("");
  const [q1, setQ1] = React.useState("");
  const [q2, setQ2] = React.useState("");
  const [q3, setQ3] = React.useState("");
  const [q4, setQ4] = React.useState("");
  const fetcher = useFetcher();
  let isAgreedDisble =
    organization === "" ||
    profession === "" ||
    q1 === "" ||
    q2 === "" ||
    q3 === "" ||
    q4 === ""
      ? true
      : false;
  const handleComplete = () => {
    if (isAgreedDisble) return alert("Please fill all the fields");

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

  return (
    <div>
      <FormWizard
        stepSize="sm"
        onComplete={handleComplete}
        backButtonTemplate={(handleNext) => (
          <Button className="base-button" onClick={handleNext}>
            Back
          </Button>
        )}
        nextButtonTemplate={(handleNext) => (
          <Button className="base-button float-right" onClick={handleNext}>
            next
          </Button>
        )}
        finishButtonTemplate={(handleComplete) => (
          <Button
            className="finish-button float-right "
            onClick={handleComplete}
          >
            Agree
          </Button>
        )}
      >
        <FormWizard.TabContent title="Personal details" icon="ti-user">
          <div className="max-w-md mx-auto flex flex-col gap-3">
            <Label htmlFor="organizationInput" value="Your Organisation" />
            <TextInput
              id="organizationInput"
              placeholder="enter organization name"
              required
              type="text"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
            />
            <Label htmlFor="professionInput" value="Your Profession" />
            <TextInput
              id="professionInput"
              placeholder="enter your profession"
              required
              type="text"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
            />
          </div>
        </FormWizard.TabContent>
        <FormWizard.TabContent title="Additional Info" icon="ti-settings">
          <div className="mx-auto flex max-w-md flex-col gap-4">
            <Label htmlFor="q1input">What are you going to translate?</Label>
            <TextInput
              id="q1input"
              placeholder="answer here.."
              type="text"
              required
              value={q1}
              onChange={(e) => setQ1(e.target.value)}
            />
            <Label htmlFor="q2input">What are you going to transcribe?</Label>
            <TextInput
              id="q2input"
              required
              placeholder="answer here.."
              type="text"
              value={q2}
              onChange={(e) => setQ2(e.target.value)}
            />
            <Label htmlFor="q3input">
              What speech are you going to generate?
            </Label>
            <TextInput
              id="q3input"
              placeholder="answer here.."
              type="text"
              required
              value={q3}
              onChange={(e) => setQ3(e.target.value)}
            />
            <Label htmlFor="q4input">what are you going to use OCR for?</Label>
            <TextInput
              id="q4input"
              placeholder="answer here.."
              type="text"
              required
              value={q4}
              onChange={(e) => setQ4(e.target.value)}
            />
          </div>
        </FormWizard.TabContent>
        <FormWizard.TabContent title="Last step" icon="ti-check">
          <div className="mx-auto w-full lg:max-w-screen-md max-h-[500vh] overflow-auto">
            <TermsAndContitions />
          </div>
        </FormWizard.TabContent>
      </FormWizard>
    </div>
  );
}

export default StepWizard;

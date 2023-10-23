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
            ཕྱིར་ལོག།
          </Button>
        )}
        nextButtonTemplate={(handleNext) => (
          <Button className="base-button float-right" onClick={handleNext}>
            རྗེས་མ།
          </Button>
        )}
        finishButtonTemplate={(handleComplete) => (
          <Button
            className="finish-button float-right "
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
          <div className="max-w-md mx-auto flex flex-col gap-3">
            <Label htmlFor="organizationInput" value="ཚོགས་པ།" />
            <TextInput
              id="organizationInput"
              required
              type="text"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
            />
            <Label htmlFor="professionInput" value="ལས་གནས།" />
            <TextInput
              id="professionInput"
              required
              type="text"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
            />
          </div>
        </FormWizard.TabContent>
        <FormWizard.TabContent title="རིག་ནུས་བཀོལ་སྤྱོད།" icon="ti-settings">
          <div className="mx-auto flex max-w-md flex-col gap-4">
            <Label htmlFor="q1input">ཁྱེད་ཀྱིས་ཡིག་སྒྱུར་ཅི་ཞིག་བྱེད་དམ།</Label>
            <TextInput
              id="q1input"
              type="text"
              required
              value={q1}
              onChange={(e) => setQ1(e.target.value)}
            />
            <Label htmlFor="q2input">
              ཁྱེད་ཀྱིས་སྒྲ་གང་ཞིག་ཡིག་འབེབས་བྱེད་དམ།
            </Label>
            <TextInput
              id="q2input"
              required
              type="text"
              value={q2}
              onChange={(e) => setQ2(e.target.value)}
            />
            <Label htmlFor="q3input">
              ཁྱེད་ཀྱིས་སྒྲ་གང་ཞིག་ཀློག་འདོན་བྱེད་དམ།
            </Label>
            <TextInput
              id="q3input"
              type="text"
              required
              value={q3}
              onChange={(e) => setQ3(e.target.value)}
            />
            <Label htmlFor="q4input">
              ཁྱེད་ཀྱིས་པར་རིས་གང་ཞིག་ཡིག་འབེབས་བྱེད་དམ།
            </Label>
            <TextInput
              id="q4input"
              type="text"
              required
              value={q4}
              onChange={(e) => setQ4(e.target.value)}
            />
          </div>
        </FormWizard.TabContent>
        <FormWizard.TabContent title="བཀོལ་སྤྱོད་ཆ་རྐྱེན།" icon="ti-check">
          <div className="mx-auto w-full lg:max-w-screen-md max-h-[500vh] overflow-auto">
            <TermsAndContitions />
          </div>
        </FormWizard.TabContent>
      </FormWizard>
    </div>
  );
}

export default StepWizard;

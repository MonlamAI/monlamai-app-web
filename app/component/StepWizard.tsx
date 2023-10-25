import { useFetcher } from "@remix-run/react";
import { Button, Label, TextInput, Select } from "flowbite-react";
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

  const q1Options = [
    "news",
    "book",
    "conversation",
    "poem",
    "letter",
    "articles",
    "documents",
    "advertesment",
    "other",
  ];

  // options to audio transcribe,
  // conversations, news, teaching, movies, lyrics, other
  const q2Options = [
    "conversations",
    "news",
    "teaching",
    "movies",
    "lyrics",
    "other",
  ];

  //   options to read via tts,
  // book, news, story, prayer, other
  const q3Options = ["book", "news", "story", "prayer", "other"];

  // options to ocr,
  // wood block print, handwritten print, modern print, billboard, rock art, other
  const q4Options = [
    "wood block print",
    "handwritten print",
    "modern print",
    "billboard",
    "rock art",
    "other",
  ];

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
            <Label htmlFor="q1input">
              ཁྱེད་ཀྱིས་ཡིག་སྒྱུར་ཅི་ཞིག་བྱེད་དམ།
              <span
                style={{ color: "red", fontSize: "20px", fontWeight: "bold" }}
              >
                *
              </span>
            </Label>
            <Select
              id="q1input"
              required
              onChange={(e) => setQ1(e.target.value)}
            >
              {q1Options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
            {q1 === "other" && (
              <TextInput
                id="q1input"
                type="text"
                required
                value={q1}
                onChange={(e) => setQ1(e.target.value)}
              />
            )}
            <Label htmlFor="q2input">
              ཁྱེད་ཀྱིས་སྒྲ་གང་ཞིག་ཡིག་འབེབས་བྱེད་དམ།
              <span
                style={{ color: "red", fontSize: "20px", fontWeight: "bold" }}
              >
                *
              </span>
            </Label>
            <Select id="q2input" required>
              {q2Options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
            {q2 === "other" && (
              <TextInput
                id="q2input"
                type="text"
                required
                value={q2}
                onChange={(e) => setQ2(e.target.value)}
              />
            )}
            <Label htmlFor="q3input">
              ཁྱེད་ཀྱིས་སྒྲ་གང་ཞིག་ཀློག་འདོན་བྱེད་དམ།
              <span
                style={{ color: "red", fontSize: "20px", fontWeight: "bold" }}
              >
                *
              </span>
            </Label>
            <Select id="q3input" required>
              {q3Options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
            {q3 === "other" && (
              <TextInput
                id="q3input"
                type="text"
                required
                value={q3}
                onChange={(e) => setQ3(e.target.value)}
              />
            )}
            <Label htmlFor="q4input">
              ཁྱེད་ཀྱིས་པར་རིས་གང་ཞིག་ཡིག་འབེབས་བྱེད་དམ།
              <span
                style={{ color: "red", fontSize: "20px", fontWeight: "bold" }}
              >
                *
              </span>
            </Label>
            <Select id="q4input" required>
              {q4Options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
            {q4 === "other" && (
              <TextInput
                id="q4input"
                type="text"
                required
                value={q4}
                onChange={(e) => setQ4(e.target.value)}
              />
            )}
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

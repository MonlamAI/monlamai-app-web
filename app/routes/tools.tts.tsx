import { Button, Card, Label, Select, Textarea } from "flowbite-react";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa/index.js";
import { Form } from "@remix-run/react";
import { type ActionFunction } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  let formdata = await request.formData();
  const voiceType = formdata.get("voice") as string;
  const userInput = formdata.get("user-input") as string;
  console.log("user form data:", voiceType, userInput);
  return null;
};

export default function Index() {
  return (
    <main className="m-auto w-11/12 md:w-4/5">
      <h1 className="text-center mb-4">TTS Demo Page</h1>
      <div className="flex flex-col  lg:flex-row gap-3">
        <Card className="w-full lg:w-1/2">
          <Form id="ttsForm" method="post" className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="countries" value="Voice" />
              <Select id="countries" name="voice" defaultValue="" required>
                <option value="" disabled>
                  select voice
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>
            </div>
            <Textarea
              id="user-input"
              name="user-input"
              placeholder="Enter text in English"
              required
              rows={4}
            />
            <div className="flex justify-between">
              <Button type="reset" form="ttsForm" pill color="gray" size="xs">
                Reset
              </Button>
              <Button
                type="submit"
                form="ttsForm"
                pill
                color="success"
                size="xs"
              >
                Submit
              </Button>
            </div>
          </Form>
        </Card>
        <Card className="w-full lg:w-1/2">
          <div className="mx-auto">
            <audio controls></audio>
          </div>
          <div className="flex justify-end">
            <Button color="white">
              <FaRegThumbsUp color="gray" />
            </Button>
            <Button color="white">
              <FaRegThumbsDown color="gray" />
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
}

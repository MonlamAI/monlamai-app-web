import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { Button, Card, FileInput, Spinner } from "flowbite-react";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa6/index.js";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  console.log(formData);

  return json({
    text: "here is text",
  });
}

export default function Index() {
  const data = useActionData<typeof action>();
  const navigation = useNavigation();
  const isActionSubmission = navigation.state == "submitting";

  return (
    <main className="mx-auto w-11/12 lg:4/5">
      <h1 className="mb-10 text-4xl lg:text-5xl text-center text-slate-700">
        Monlam OCR
      </h1>

      <div className="mt-1 flex flex-col md:flex-row items-strech gap-5">
        <Card className="md:w-1/2">
          <Form method="post" encType="multipart/form-data">
            <div className="w-full min-h-[50vh] flex items-center justify-center">
              <div id="fileUpload">
                <FileInput
                  helperText="Supports .png, .jpg, .jpeg"
                  sizing="lg"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                isProcessing={isActionSubmission}
                className=""
              >
                Submit
              </Button>
            </div>
          </Form>
        </Card>

        <Card className="md:w-1/2">
          <div className="w-full h-[50vh] p-3 text-black bg-slate-50 rounded-lg overflow-auto">
            {isActionSubmission ? (
              <div className="h-full flex justify-center items-center">
                <Spinner />
              </div>
            ) : (
              <div className="text-lg font-monlam tracking-wide leading-loose">
                {data && data.text}
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <Button color="white">
              <FaRegThumbsUp color="gray" size="20px" />
            </Button>
            <Button color="white">
              <FaRegThumbsDown color="gray" size="20px" />
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
}

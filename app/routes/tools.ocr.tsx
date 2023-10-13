import { Button, Card } from "flowbite-react";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa/index.js";

export default function Index() {
  return (
    <main className="m-auto w-11/12 md:w-4/5">
      <h1>OCR Demo Page</h1>
      <div className="flex gap-3">
        <Card className="w-1/2">
          <p className="text-black">Input Component</p>
          <div className="flex justify-between">
            <Button pill color="gray" size="xs">
              Reset
            </Button>
            <Button pill color="success" size="xs">
              Submit
            </Button>
          </div>
        </Card>
        <Card className="w-1/2">
          <p className="text-black">Output Component</p>

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

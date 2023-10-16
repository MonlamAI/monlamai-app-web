import { Button, Card, Textarea } from "flowbite-react";
import {
  FaArrowRightArrowLeft,
  FaRegThumbsDown,
  FaRegThumbsUp,
} from "react-icons/fa6/index.js";

export default function Index() {
  return (
    <main className="m-auto w-11/12 md:w-4/5">
      <h1>MT Page</h1>
      <div className="flex gap-3">
        <Card className="w-1/2">
          <h3 className="text-center font-bold text-gray-800">Tibetan</h3>
          <Textarea
            placeholder="Enter your text here"
            className="w-full h-48"
            required
          />
          <div className="flex justify-between">
            <Button pill color="gray" size="xs">
              Reset
            </Button>
            <Button pill color="success" size="xs">
              Submit
            </Button>
          </div>
        </Card>
        <FaArrowRightArrowLeft className="lg:mt-6" size="20px" />
        <Card className="w-1/2">
          <h3 className="text-center font-bold text-gray-900">English </h3>
          <Textarea className="w-full h-48" disabled />
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

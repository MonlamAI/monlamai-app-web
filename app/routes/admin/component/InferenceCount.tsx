import { useLoaderData } from "@remix-run/react";

function InferenceCount() {
  let { inferenceCount } = useLoaderData();
  if (!inferenceCount) return null;
  return (
    <div className="flex flex-col items-center justify-center  ">
      <div className="shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Inference Counts
        </h1>
        {inferenceCount?.map((item) => {
          return (
            <p
              key={item.model}
              className="text-lg text-gray-700 dark:text-gray-200 mb-2"
            >
              <span className="font-semibold">{item.model}:</span>{" "}
              {item._count._all}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default InferenceCount;

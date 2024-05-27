import { useLoaderData } from "@remix-run/react";

function InferenceCount() {
  let { inferenceCount } = useLoaderData();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Inference Counts
        </h1>
        {inferenceCount.map((item) => {
          return (
            <p key={item.model} className="text-lg text-gray-700 mb-2">
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

import { useLoaderData } from "@remix-run/react";
function InferenceCount() {
  let { inferenceCount } = useLoaderData();
  return (
    <div>
      {inferenceCount.map((item) => {
        return (
          <p key={item.model}>
            {item.model}: {item._count._all}
          </p>
        );
      })}
    </div>
  );
}

export default InferenceCount;

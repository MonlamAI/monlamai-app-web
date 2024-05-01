import { useRevalidator } from "@remix-run/react";
import { useEffect, useState } from "react";

export function Progress({ progress, inferenceId }) {
  const revalidator = useRevalidator();
  const [progressed, setProgressed] = useState(null);
  useEffect(() => {
    let temp_progressed = progress[inferenceId] ?? "";
    setProgressed(temp_progressed);
    if (temp_progressed === "complete") {
      setTimeout(() => {
        revalidator.revalidate();
      }, 2000);
    }
  }, [progress]);
  return (
    <div className="text-yellow-500">
      <div>{progressed}</div>
      <div role="status"></div>
    </div>
  );
}

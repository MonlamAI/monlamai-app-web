import { useEffect } from "react";
import { toast } from "react-toastify";

function ErrorMessage({ error }) {
  useEffect(() => {
    toast.warn(error, {
      position: toast.POSITION.TOP_RIGHT,
      style: {
        top: "5rem",
      },
    });
  }, []);
  return null;
}

export default ErrorMessage;

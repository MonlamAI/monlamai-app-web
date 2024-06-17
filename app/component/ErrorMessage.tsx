import React, { useEffect } from "react";
import { toast } from "react-toastify";

function ErrorMessage({ message, handleClose }) {
  useEffect(() => {
    toast.warn(message, {
      position: "bottom-right",
      closeOnClick: true,
    });
  }, []);
  return <div />;
}

export default ErrorMessage;

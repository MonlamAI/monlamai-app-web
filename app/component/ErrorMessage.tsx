import React, { useEffect } from "react";
import { toast } from "react-toastify";

function ErrorMessage({ message, handleClose }) {
  useEffect(() => {
    toast.warn(message, {
      position: toast.POSITION.BOTTOM_CENTER,
      closeOnClick: true,
    });
    toast.onChange((e) => {
      if (e.status === "removed") {
        handleClose();
      }
    });
  }, []);
  return <div />;
}

export default ErrorMessage;

import { useNavigate } from "@remix-run/react";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

export function ErrorMessage({ message, handleClose, type }) {
  useEffect(() => {
    toast(message, {
      type,
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

export function ModalErrorMessage({ message, type }) {
  const navigate = useNavigate();

  useEffect(() => {
    toast(message, {
      type,
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 2000, // Toast message duration in milliseconds
      closeOnClick: true,
    });

    // Navigate back to the previous page after 1 second
    const timer = setTimeout(() => {
      navigate("/", { replace: true });
    }, 2000);

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, [message, type, navigate]);

  return <div></div>;
}

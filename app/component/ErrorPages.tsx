import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { API_ERROR_MESSAGE } from "~/helper/const";
import { ModalErrorMessage } from "./ErrorMessage";

type RootErrorPageProps = {
  error: Error;
};
export function ErrorPage({ error }: RootErrorPageProps) {
  const getMessage = () => {
    let statusCode = (error as any)?.status;
    switch (statusCode) {
      case 404:
        return "Oops! The page you're looking for doesn't exist. It might have been moved or deleted.";
      case 403:
        return "Sorry, you don't have permission to access this page. Please check your credentials or contact support.";
      case 400:
        return "It seems there's an issue with your request. Please check and try again.";
      case 500:
        return "Something went wrong on our end. We're working to fix it. Please try again later.";
      case 502:
        return "We're experiencing some technical issues. Please try refreshing the page.";
      case 503:
        return "We're currently undergoing maintenance. Please check back soon.";
      default:
        return "An unexpected error has occurred.";
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center h-full">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500">Oops!</h1>
          <p className="mt-4 text-lg text-gray-700">Something went wrong.</p>
          <p className="mt-2 text-gray-500">{getMessage()}</p>
          <p className="mt-2 text-gray-700 shadow-md bg-red-300 rounded-lg">
            {error?.message}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  useEffect(() => {
    if (isRouteErrorResponse(error)) {
      toast.warn(API_ERROR_MESSAGE, {
        position: toast.POSITION.BOTTOM_RIGHT,
        closeOnClick: true,
      });
    }
  }, []);

  if (isRouteErrorResponse(error)) return <div />;
  return <ModalErrorMessage message={error?.message} type="error" />;
}

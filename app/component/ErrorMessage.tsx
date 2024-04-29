function ErrorMessage({ message, handleClose }) {
  return (
    <div
      className="bg-red-100 mb-3 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong className="font-bold">Error! </strong>
      <span className="block sm:inline">{message}</span>
      <span
        onClick={handleClose}
        className="absolute top-0 bottom-0 right-0 px-4 py-3"
      >
        <svg
          className="fill-current h-6 w-6 text-red-500"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>Close</title>
          <path d="M14.348 14.849a1.2 1.2 0 1 1-1.697 1.697l-2.651-2.65-2.651 2.65a1.2 1.2 0 1 1-1.697-1.697l2.651-2.651-2.651-2.651a1.2 1.2 0 1 1 1.697-1.697l2.651 2.65 2.651-2.65a1.2 1.2 0 1 1 1.697 1.697l-2.651 2.651 2.651 2.651z" />
        </svg>
      </span>
    </div>
  );
}

export default ErrorMessage;

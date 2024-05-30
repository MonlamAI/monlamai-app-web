import React from "react";

function Card(props) {
  return (
    <div
      className={`flex rounded-bl-md rounded-br-md border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col lg:w-1/2 py-2 px-3
   ${props.className}`}
    >
      {props.children}
    </div>
  );
}

export default Card;

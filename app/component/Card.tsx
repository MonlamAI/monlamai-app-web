import React from "react";

function Card(props) {
  return (
    <div
      className={`flex rounded-lg  flex-col lg:w-1/2 py-2 px-3
   ${props.className}`}
    >
      {props.children}
    </div>
  );
}

export default Card;

import React from "react";

function Card(props) {
  return (
    <div
      className={`flex   bg-white shadow-md  dark:bg-secondary-700 flex-col lg:w-1/2 
   ${props.className}`}
    >
      {props.children}
    </div>
  );
}

export default Card;

import React, { useState, useEffect, useRef } from "react";

function Card(props) {
  let enable = !!props?.focussed;
  let [isFocussed, setIsFocussed] = useState(false);
  const cardRef = useRef(null);

  function enableFocus() {
    if (enable) {
      setIsFocussed(true);
    }
  }

  function handleClickOutside(event) {
    if (cardRef.current && !cardRef.current.contains(event.target)) {
      setIsFocussed(false);
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on cleanup
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cardRef]);

  return (
    <div
      ref={cardRef}
      onClick={enableFocus}
      className={`flex bg-white shadow-md dark:bg-secondary-700 flex-col lg:w-1/2 
    ${
      isFocussed
        ? "border-2 border-secondary-500 dark:border-primary-500 rounded-bl-lg"
        : props.className
    }`}
    >
      {props.children}
    </div>
  );
}

export default Card;

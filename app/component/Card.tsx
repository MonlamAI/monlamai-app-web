import React, { useState, useEffect, useRef } from "react";

function Card(props) {
  const enable = !!props?.focussed;
  const [isFocussed, setIsFocussed] = useState(false);
  const cardRef = useRef(null);

  function enableFocus() {
    if (enable) {
      setIsFocussed(true);
    }
  }

  function handleClickOutside(event) {
    if (cardRef.current && !cardRef.current?.contains(event.target)) {
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
        ? "outline -outline-offset-2 outline-secondary-100 dark:outline-primary-500 rounded-bl-lg"
        : props.className
    }`}
    >
      {props.children}
    </div>
  );
}

export default Card;

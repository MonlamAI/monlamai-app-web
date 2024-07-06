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
      className={`flex flex-1 bg-white shadow-md dark:bg-[--card-bg] flex-col lg:w-1/2
    ${
      isFocussed
        ? "border border-1 border-secondary-100 dark:border-primary-900 dark:border-opacity-40 lg:rounded-bl-lg"
        : props.className
    }`}
    >
      {props.children}
    </div>
  );
}

export default Card;

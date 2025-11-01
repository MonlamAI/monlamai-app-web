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
      className={`flex flex-1 bg-white shadow-md dark:bg-[--card-bg] flex-col lg:w-1/2 dark:shadow-[0_4px_20px_rgba(255,255,255,0.08)] dark:transition-all dark:duration-300 dark:hover:-translate-y-[2px] dark:hover:shadow-[0_8px_28px_rgba(255,255,255,0.12)]
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

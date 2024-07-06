import React from "react";

function Devider() {
  return (
    <div
      className={`inline-block
        h-0.5 w-auto lg:h-auto lg:min-h-[1em] lg:w-0.5
        bg-neutral-100 dark:bg-[--card-border]`}
    ></div>
  );
}

export default Devider;

import React, { useState, useEffect } from "react";

function useDetectPWA() {
  const [isPWA, setIsPWA] = useState(false);

  useEffect(() => {
    function isRunningStandalone() {
      return (
        window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone === true
      );
    }
    if (isRunningStandalone()) {
      setIsPWA(true);
    } else {
      setIsPWA(false);
    }
  }, []);

  return isPWA;
}

export default useDetectPWA;

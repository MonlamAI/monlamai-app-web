import React, { useState, useEffect } from "react";

function useDetectPWA() {
  const [isPWA, setIsPWA] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsPWA(true);
    } else {
      setIsPWA(false);
    }
  }, []);

  return isPWA;
}

export default useDetectPWA;

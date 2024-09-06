import { useEffect, useRef } from "react";

function useEffectAfterFirstRender(effect, dependencies) {
  const hasMounted = useRef(false);

  useEffect(() => {
    if (hasMounted.current) {
      return effect();
    } else {
      hasMounted.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}

export default useEffectAfterFirstRender;

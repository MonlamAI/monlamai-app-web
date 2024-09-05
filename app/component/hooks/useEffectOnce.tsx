import { useEffect, useRef } from "react";

/**
 * Custom hook to run an effect only on updates, not on the initial render.
 * @param {Function} effect - The effect function to run.
 * @param {Array} deps - Dependencies for the effect.
 */
function useEffectOnce(effect, deps = []) {
  const hasMounted = useRef(false);

  useEffect(() => {
    if (hasMounted.current) {
      // Run the effect only after the initial render
      return effect();
    } else {
      // Set the flag to true after the first render
      hasMounted.current = true;
    }
  }, deps); // Run the effect based on the dependencies
}

export default useEffectOnce;

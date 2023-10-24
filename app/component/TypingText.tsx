import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const TypingAnimation = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  const controls = useAnimation();

  useEffect(() => {
    const animateText = async () => {
      setDisplayText("");
      for (let i = 0; i <= text.length; i++) {
        setDisplayText(text.slice(0, i));
        await controls.start({ opacity: 1 });
        await controls.start({ opacity: 0 });
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    };

    animateText();
  }, [text, controls]);

  return <motion.div>{displayText}</motion.div>;
};

export default TypingAnimation;

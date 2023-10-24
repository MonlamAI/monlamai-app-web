import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const TypingAnimation = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  const controls = useAnimation();
  useEffect(() => {
    const animateText = async () => {
      setDisplayText(""); // Start with an empty string
      for (let i = 0; i <= text.length; i++) {
        setDisplayText(text.slice(0, i)); // Replace '\\n' with '\n'
        await controls.start({ opacity: 1 });
        await controls.start({ opacity: 0 });
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
    };

    animateText();
  }, [text, controls]);

  return (
    <div>
      <motion.div
        dangerouslySetInnerHTML={{
          __html: displayText?.replaceAll("\n", "<br/>"),
        }}
      ></motion.div>
    </div>
  );
};

export default TypingAnimation;

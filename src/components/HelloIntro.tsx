import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface HelloIntroProps {
  onComplete: () => void;
}

const HelloIntro = ({ onComplete }: HelloIntroProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Show "Hello" for 0.8 seconds, then fade out
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Call onComplete after fade out animation
      setTimeout(onComplete, 200);
    }, 400);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            Hello
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HelloIntro;

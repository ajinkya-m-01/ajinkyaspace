import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface PageIntroProps {
  children: React.ReactNode;
}

const PageIntro = ({ children }: PageIntroProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Brief intro animation
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 800);

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <>
      {/* Intro overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
           style={{ willChange: "transform, opacity" }}>
            {/* Animated logo/name reveal */}
            <div className="relative">
              {/* Decorative line */}
              <motion.div
                className="absolute -top-8 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-accent-lime to-transparent"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 120, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
               style={{ willChange: "transform, opacity" }} />
              
              {/* Name/Initial */}
              <motion.div
                className="text-5xl md:text-7xl font-light tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
               style={{ willChange: "transform, opacity" }}>
                <span className="text-accent-lime">A</span>
                <span className="text-foreground/80">jinkya</span>
              </motion.div>

              {/* Subtitle */}
              <motion.p
                className="text-xs md:text-sm uppercase tracking-[0.3em] text-muted-foreground mt-3 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
               style={{ willChange: "transform, opacity" }}>
                Full-stack Developer
              </motion.p>

              {/* Loading indicator */}
              <motion.div
                className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
               style={{ willChange: "transform, opacity" }}>
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 bg-accent-lime/60 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut",
                    }}
                   style={{ willChange: "transform, opacity" }} />
                ))}
              </motion.div>
            </div>

            {/* Corner accents */}
            <motion.div
              className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-accent-lime/30"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
             style={{ willChange: "transform, opacity" }} />
            <motion.div
              className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-accent-lime/30"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
             style={{ willChange: "transform, opacity" }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content with fade-in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
       style={{ willChange: "transform, opacity" }}>
        {children}
      </motion.div>
    </>
  );
};

export default PageIntro;

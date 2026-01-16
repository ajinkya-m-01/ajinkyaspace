import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface HelloIntroProps {
  onComplete: () => void;
}

const HelloIntro = ({ onComplete }: HelloIntroProps) => {
  const [phase, setPhase] = useState<"hello" | "name" | "exit">("hello");

  useEffect(() => {
    // Phase 1: Show "Hello" 
    const helloTimer = setTimeout(() => {
      setPhase("name");
    }, 800);

    // Phase 2: Show name, then exit
    const nameTimer = setTimeout(() => {
      setPhase("exit");
    }, 2000);

    // Complete after exit animation
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2600);

    return () => {
      clearTimeout(helloTimer);
      clearTimeout(nameTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Subtle background texture */}
          <div 
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Ambient glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-lime/5 rounded-full blur-[150px]" />
          </motion.div>

          {/* Corner accents */}
          <motion.div
            className="absolute top-8 left-8 w-16 h-16 border-l border-t border-foreground/10"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
          <motion.div
            className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-foreground/10"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          />

          {/* Main content */}
          <div className="relative text-center">
            {/* Decorative top line */}
            <motion.div
              className="absolute -top-8 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-accent-lime/50 to-transparent"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 100, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            />

            {/* Hello text */}
            <AnimatePresence mode="wait">
              {phase === "hello" && (
                <motion.h1
                  key="hello"
                  className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tight text-foreground"
                  initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                  transition={{ 
                    duration: 0.7, 
                    ease: [0.25, 0.46, 0.45, 0.94] 
                  }}
                >
                  Hello
                  <motion.span
                    className="inline-block text-accent-lime"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                  >
                    .
                  </motion.span>
                </motion.h1>
              )}

              {phase === "name" && (
                <motion.div
                  key="name"
                  className="flex flex-col items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.h1
                    className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight"
                    initial={{ opacity: 0, y: 30, filter: "blur(15px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <span className="text-accent-lime">A</span>
                    <span className="text-foreground">jinkya</span>
                    <span className="text-foreground/60 ml-4">Mhetre</span>
                  </motion.h1>

                  <motion.p
                    className="mt-4 text-sm md:text-base uppercase tracking-[0.3em] text-muted-foreground"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    Full-stack Developer
                  </motion.p>

                  {/* Animated underline */}
                  <motion.div
                    className="mt-6 h-px bg-gradient-to-r from-transparent via-accent-lime to-transparent"
                    initial={{ width: 0 }}
                    animate={{ width: 200 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Decorative bottom line */}
            <motion.div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 80, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </div>

          {/* Loading dots */}
          <motion.div
            className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 bg-accent-lime/50 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default HelloIntro;

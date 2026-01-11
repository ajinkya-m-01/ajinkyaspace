import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
  enableParallax?: boolean;
}

const SectionReveal = ({ 
  children, 
  className = "", 
  delay = 0,
  direction = "up",
  enableParallax = false
}: SectionRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const parallaxY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  
  const getInitialPosition = () => {
    switch (direction) {
      case "left": return { x: -40, y: 0 };
      case "right": return { x: 40, y: 0 };
      default: return { x: 0, y: 40 };
    }
  };
  
  const initial = getInitialPosition();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...initial }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ 
        duration: 0.9, 
        delay,
        ease: [0.16, 1, 0.3, 1] // Custom easing for premium feel
      }}
      style={enableParallax ? { y: parallaxY } : undefined}
    >
      {children}
    </motion.div>
  );
};

export default SectionReveal;

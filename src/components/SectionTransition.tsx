import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface SectionTransitionProps {
  children: ReactNode;
  className?: string;
  variant?: "fade" | "wipe" | "slide-up" | "scale";
}

const SectionTransition = ({ 
  children, 
  className = "",
  variant = "fade"
}: SectionTransitionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.3"]
  });
  
  // Different transforms based on variant
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const clipPath = useTransform(
    scrollYProgress, 
    [0, 1], 
    ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]
  );

  const getMotionProps = () => {
    switch (variant) {
      case "wipe":
        return { clipPath, opacity };
      case "slide-up":
        return { y, opacity };
      case "scale":
        return { scale, opacity };
      default:
        return { opacity };
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={getMotionProps()}
    >
      {children}
    </motion.div>
  );
};

export default SectionTransition;

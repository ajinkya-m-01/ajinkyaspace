import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface HorizontalWipeProps {
  children: ReactNode;
  className?: string;
  direction?: "left" | "right";
}

const HorizontalWipe = ({ 
  children, 
  className = "",
  direction = "left"
}: HorizontalWipeProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.3"]
  });
  
  const clipPathLeft = useTransform(
    scrollYProgress, 
    [0, 1], 
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
  );
  
  const clipPathRight = useTransform(
    scrollYProgress, 
    [0, 1], 
    ["inset(0 0 0 100%)", "inset(0 0 0 0%)"]
  );
  
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0.5, 1]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ willChange: "transform, opacity", clipPath: direction === "left" ? clipPathLeft : clipPathRight,
        opacity }}
    >
      {children}
    </motion.div>
  );
};

export default HorizontalWipe;

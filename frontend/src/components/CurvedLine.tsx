import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface CurvedLineProps {
  className?: string;
}

const CurvedLine = ({ className = "" }: CurvedLineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const pathLength = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className={`relative w-full h-[400px] md:h-[600px] overflow-hidden ${className}`}>
      <motion.svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
        fill="none"
        style={{ willChange: "transform, opacity", opacity }}
      >
        {/* Main curved path */}
        <motion.path
          d="M0 350 Q 200 50, 400 200 T 800 100 T 1200 250"
          stroke="hsl(var(--accent-lime))"
          strokeWidth="20"
          strokeLinecap="round"
          fill="none"
          style={{ willChange: "transform, opacity", pathLength }}
        />
        
        {/* Vertical line from curve */}
        <motion.line
          x1="600"
          y1="200"
          x2="600"
          y2="400"
          stroke="hsl(var(--accent-lime))"
          strokeWidth="4"
          style={{ willChange: "transform, opacity", pathLength: useTransform(scrollYProgress, [0.4, 0.7], [0, 1]) }}
        />
        
        {/* Dot at end of vertical line */}
        <motion.circle
          cx="600"
          cy="400"
          r="8"
          fill="hsl(var(--foreground))"
          style={{ willChange: "transform, opacity", opacity: useTransform(scrollYProgress, [0.6, 0.7], [0, 1]) }}
        />
      </motion.svg>
    </div>
  );
};

export default CurvedLine;

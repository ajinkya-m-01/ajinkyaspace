import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

const TextReveal = ({ 
  children, 
  className = "",
  as: Component = "span"
}: TextRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.4"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const blur = useTransform(scrollYProgress, [0, 1], [8, 0]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        style={{ 
          opacity, 
          y,
          filter: blur.get() > 0 ? `blur(${blur}px)` : undefined
        }}
      >
        <Component className={className}>
          {children}
        </Component>
      </motion.div>
    </div>
  );
};

export default TextReveal;

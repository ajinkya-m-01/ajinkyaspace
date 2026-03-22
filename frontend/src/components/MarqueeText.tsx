import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface MarqueeTextProps {
  texts: string[];
  direction?: "left" | "right";
  speed?: number;
  className?: string;
  withIcons?: boolean;
}

const MarqueeText = ({ 
  texts, 
  direction = "left", 
  speed = 20,
  className = "",
  withIcons = false
}: MarqueeTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const x = useTransform(
    scrollYProgress, 
    [0, 1], 
    direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"]
  );

  // Duplicate texts for seamless loop
  const duplicatedTexts = [...texts, ...texts, ...texts, ...texts];

  return (
    <div ref={ref} className={`overflow-hidden py-4 md:py-8 ${className}`}>
      <motion.div 
        className="flex whitespace-nowrap"
        style={{ willChange: "transform, opacity", x }}
      >
        {duplicatedTexts.map((text, index) => (
          <div key={index} className="flex items-center mx-4 md:mx-8">
            {withIcons && (
              <span className="mr-4 md:mr-6 opacity-40">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6 md:w-8 md:h-8">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" />
                  {[...Array(8)].map((_, i) => (
                    <line 
                      key={i}
                      x1="12" y1="2" x2="12" y2="6"
                      stroke="currentColor" 
                      strokeWidth="1"
                      transform={`rotate(${i * 45} 12 12)`}
                    />
                  ))}
                </svg>
              </span>
            )}
            <span className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight italic">
              {text}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeText;

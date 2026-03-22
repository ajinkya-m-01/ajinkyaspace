import { motion } from "framer-motion";

interface InfiniteTickerProps {
  className?: string;
}

const InfiniteTicker = ({ className = "" }: InfiniteTickerProps) => {
  const text = "FULL-STACK DEVELOPER";
  
  // Create multiple copies for seamless loop
  const items = [...Array(10)].map((_, i) => (
    <span key={i} className="flex items-center whitespace-nowrap">
      <span className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight uppercase">
        {text}
      </span>
      <span className="mx-4 md:mx-8 text-2xl md:text-4xl">🌼</span>
    </span>
  ));

  return (
    <div className={`overflow-hidden py-8 md:py-12 border-y border-border/20 ${className}`}>
      <motion.div 
        className="flex whitespace-nowrap animate-ticker"
        initial={{ x: 0 }}
       style={{ willChange: "transform, opacity" }}>
        {items}
      </motion.div>
    </div>
  );
};

export default InfiniteTicker;

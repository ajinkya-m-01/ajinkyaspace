import { motion, useScroll, useTransform } from "framer-motion";

const ScrollLine = () => {
  const { scrollYProgress } = useScroll();
  
  // Transform scroll progress to path drawing
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const pathOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 0.3, 0.3, 0]);
  const circleY = useTransform(scrollYProgress, [0, 1], [0, 1000]);
  const circleOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  return (
    <div className="fixed left-8 md:left-12 top-0 h-screen w-px z-40 pointer-events-none hidden md:block">
      <svg
        className="absolute top-0 left-0 w-8 h-full overflow-visible"
        viewBox="0 0 30 1000"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* Hand-drawn style curly line path */}
        <motion.path
          d="M15 0 
             C 20 50, 5 80, 15 120
             C 25 160, 8 200, 15 250
             C 22 300, 5 340, 15 380
             C 25 420, 10 460, 15 500
             C 20 540, 5 580, 15 620
             C 25 660, 8 700, 15 750
             C 22 800, 5 850, 15 900
             C 20 950, 15 980, 15 1000"
          stroke="hsl(var(--foreground))"
          strokeWidth="0.5"
          strokeLinecap="round"
          fill="none"
          style={{
            pathLength,
            opacity: pathOpacity,
          }}
        />
        
        {/* Small circle indicator at current scroll position */}
        <motion.circle
          cx="15"
          r="3"
          fill="hsl(var(--foreground))"
          style={{
            opacity: circleOpacity,
          }}
          cy={circleY}
        />
      </svg>
    </div>
  );
};

export default ScrollLine;

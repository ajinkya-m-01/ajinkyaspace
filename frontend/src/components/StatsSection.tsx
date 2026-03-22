import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface StatProps {
  label: string;
  value: string;
  suffix?: string;
}

const AnimatedNumber = ({ value, suffix = "" }: { value: string; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);
  const numericValue = parseInt(value);
  
  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;
      let currentStep = 0;
      
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(Math.floor(easeProgress * numericValue));
        
        if (currentStep >= steps) {
          clearInterval(interval);
          setDisplayValue(numericValue);
        }
      }, stepDuration);
      
      return () => clearInterval(interval);
    }
  }, [isInView, numericValue]);

  return (
    <span ref={ref} className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tight">
      {displayValue}{suffix}
    </span>
  );
};

const Stat = ({ label, value, suffix }: StatProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center md:text-left"
     style={{ willChange: "transform, opacity" }}>
      <p className="text-editorial-xs text-muted-foreground mb-4 md:mb-6">{label}</p>
      <AnimatedNumber value={value} suffix={suffix} />
    </motion.div>
  );
};

const StatsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const curvePathLength = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 px-6 overflow-hidden">
      {/* Decorative curved line */}
      <motion.svg
        className="absolute right-0 top-0 w-1/2 h-full pointer-events-none hidden md:block"
        viewBox="0 0 400 600"
        preserveAspectRatio="none"
        fill="none"
        style={{ willChange: "transform, opacity", opacity }}
      >
        <motion.path
          d="M400 0 Q 200 200, 300 300 T 100 600"
          stroke="hsl(var(--accent-lime))"
          strokeWidth="40"
          strokeLinecap="round"
          fill="none"
          style={{ willChange: "transform, opacity", pathLength: curvePathLength }}
        />
      </motion.svg>
      
      <div className="relative max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          {/* Left column - Philosophy text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
           style={{ willChange: "transform, opacity" }}>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-light leading-snug italic">
              Driving measurable growth and engagement through thoughtful design and engineering.
            </h3>
          </motion.div>
          
          {/* Right column - Description */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
           style={{ willChange: "transform, opacity" }}>
            <p className="text-editorial-sm text-muted-foreground leading-relaxed">
              Every product I build starts with understanding user goals and translating them into intuitive, high-performance experiences. From concept to launch, I focus on meaningful results—boosting user engagement, retention, and overall business impact.
            </p>
          </motion.div>
        </div>
        
        {/* Divider line */}
        <motion.div 
          className="h-px bg-border my-16 md:my-24"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
         style={{ willChange: "transform, opacity" }} />
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-8 md:gap-16">
          <Stat label="YEARS OF EXPERIENCE" value="2" suffix="+" />
          <Stat label="PROJECTS COMPLETED" value="15" suffix="+" />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

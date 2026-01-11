import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import InfiniteTicker from "./InfiniteTicker";
import CircularMenu from "./CircularMenu";
import WordReveal from "./WordReveal";
import portraitImage from "@/assets/portrait-half-body.jpg";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  const smoothImageY = useSpring(imageY, { stiffness: 50, damping: 20 });
  const smoothImageScale = useSpring(imageScale, { stiffness: 50, damping: 20 });

  return (
    <>
      <section 
        ref={containerRef}
        className="relative min-h-screen flex flex-col overflow-hidden bg-background"
      >
        <CircularMenu />
        
        {/* Main hero content */}
        <div className="flex-1 flex items-center justify-center px-6 md:px-12 lg:px-20 xl:px-32 pt-32 pb-20 lg:pt-0 lg:pb-0">
          <div className="w-full max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center">
            {/* Left: Text content */}
            <motion.div 
              className="flex flex-col justify-center space-y-6 md:space-y-8 z-10"
              style={{ y: contentY, opacity: contentOpacity }}
            >
            <motion.p
              className="text-xs md:text-sm uppercase tracking-wider text-accent-lime"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Hi! I'm Ajinkya
            </motion.p>

            <WordReveal
              text="Full-stack Developer"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-light tracking-tight leading-tight"
              delay={0.5}
            />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.2 }}
            >
              <a 
                href="#work"
                className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-transparent border border-foreground/30 text-foreground hover:bg-foreground hover:text-background transition-all duration-300 text-sm md:text-base"
              >
                <span>View My Work</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Profile image */}
          <motion.div
            className="flex items-center justify-center lg:justify-end"
            style={{ 
              y: smoothImageY, 
              scale: smoothImageScale,
              opacity: contentOpacity
            }}
          >
            <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
              {/* Orange gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 via-orange-400/20 to-transparent mix-blend-overlay z-10 pointer-events-none" />
            
              <motion.div
                className="relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <motion.img
                  src={portraitImage}
                  alt="Ajinkya Mehetre"
                  className="w-full h-auto grayscale contrast-110 img-zoom"
                />
              </motion.div>
            
              {/* Decorative elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-24 h-24 border border-accent-lime/50 rounded-full"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 1 }}
              />
              <motion.div
                className="absolute -bottom-6 -left-6 w-16 h-16 bg-accent-lime/20 rounded-full blur-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
              />
            </div>
          </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.5 }}
          style={{ opacity: contentOpacity }}
        >
          <motion.div
            className="w-px h-12 bg-foreground/30"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span 
            className="text-editorial-xs text-muted-foreground"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            scroll
          </motion.span>
        </motion.div>
      </section>
      
      {/* Infinite ticker below hero */}
      <InfiniteTicker />
    </>
  );
};

export default Hero;

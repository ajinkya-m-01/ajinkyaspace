import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InfiniteTicker from "./InfiniteTicker";
import CircularMenu from "./CircularMenu";
import WordReveal from "./WordReveal";
import portraitImage from "@/assets/portrait-half-body.jpg";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
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

  // Subtle mouse tracking for background glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 30, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth - 0.5) * 30);
      mouseY.set((clientY / innerHeight - 0.5) * 30);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      <section 
        ref={containerRef}
        className="relative min-h-screen flex flex-col overflow-hidden bg-background"
      >
        {/* Subtle noise texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.015] pointer-events-none z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Ambient background glow - mouse reactive */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-0"
          style={{ x: smoothMouseX, y: smoothMouseY }}
        >
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-accent-lime/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/3 left-1/3 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[120px]" />
        </motion.div>

        <CircularMenu />
        
        {/* Main hero content */}
        <div className="flex-1 flex items-center justify-center px-6 md:px-12 lg:px-20 xl:px-32 pt-32 pb-20 lg:pt-0 lg:pb-0 relative z-10">
          <div className="w-full max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center">
            {/* Left: Text content */}
            <motion.div 
              className="flex flex-col justify-center space-y-6 md:space-y-8 z-10 relative"
              style={{ y: contentY, opacity: contentOpacity }}
            >
              {/* Subtle vertical accent line */}
              <motion.div
                className="absolute -left-4 md:-left-8 top-0 bottom-0 w-px"
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                style={{ originY: 0 }}
              >
                <div className="h-full w-full bg-gradient-to-b from-transparent via-accent-lime/30 to-transparent" />
              </motion.div>

              <motion.p
                className="text-xs md:text-sm uppercase tracking-[0.2em] text-accent-lime font-medium"
                initial={{ opacity: 0, y: 15, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                Hi! I'm Ajinkya
              </motion.p>

              {/* Enhanced role text with underline animation */}
              <div className="relative">
                <WordReveal
                  text="Full-stack Developer"
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-light tracking-tight leading-tight"
                  delay={0.5}
                />
                {/* Animated underline matching navbar style */}
                <motion.div
                  className="h-[2px] bg-gradient-to-r from-accent-lime via-accent-lime to-transparent mt-4 origin-left"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              </div>
              
              {/* Enhanced CTA button */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Link 
                  to="/works"
                  className="group relative inline-flex items-center gap-3 px-7 md:px-9 py-3.5 md:py-4 bg-transparent border border-foreground/20 text-foreground transition-all duration-500 text-sm md:text-base overflow-hidden"
                >
                  {/* Hover background fill */}
                  <span className="absolute inset-0 bg-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left" />
                  
                  {/* Subtle glow on hover */}
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_30px_rgba(163,230,53,0.15)]" />
                  
                  <span className="relative z-10 group-hover:text-background transition-colors duration-500">View My Work</span>
                  <motion.svg 
                    width="18" 
                    height="18" 
                    viewBox="0 0 16 16" 
                    fill="none" 
                    className="relative z-10 transition-all duration-500 group-hover:text-background group-hover:translate-x-1"
                  >
                    <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </motion.svg>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right: Profile image with premium treatment */}
            <motion.div
              className="flex items-center justify-center lg:justify-end"
              style={{ 
                y: smoothImageY, 
                scale: smoothImageScale,
                opacity: contentOpacity
              }}
            >
              <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
                {/* Radial glow behind image */}
                <motion.div
                  className="absolute inset-0 -z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5, delay: 0.3 }}
                >
                  <div className="absolute inset-[-20%] bg-gradient-radial from-accent-lime/10 via-orange-500/5 to-transparent rounded-full blur-3xl" />
                </motion.div>

                {/* Image container with organic styling */}
                <motion.div
                  className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem]"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  whileHover={{ scale: 1.02 }}
                  style={{ transition: "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
                >
                  {/* Soft edge mask/gradient for blending */}
                  <div className="absolute inset-0 z-20 pointer-events-none">
                    <div className="absolute inset-0 shadow-[inset_0_0_60px_20px_rgba(18,18,18,0.4)]" />
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background/60 to-transparent" />
                  </div>

                  {/* Orange/warm gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-orange-400/10 to-transparent mix-blend-overlay z-10 pointer-events-none" />
                  
                  {/* Gentle floating animation on image */}
                  <motion.div
                    animate={{ 
                      y: [0, -8, 0],
                      scale: [1, 1.02, 1]
                    }}
                    transition={{ 
                      duration: 8, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                    <motion.img
                      src={portraitImage}
                      alt="Ajinkya Mehetre"
                      loading="eager"
                      fetchpriority="high"
                      width="728"
                      height="728"
                      className="w-full h-auto grayscale contrast-110 hover:grayscale-[0.7] hover:contrast-[1.15] transition-all duration-700"
                    />
                  </motion.div>
                </motion.div>
              
                {/* Decorative elements - enhanced */}
                <motion.div
                  className="absolute -top-4 -right-4 w-28 h-28 border border-accent-lime/40 rounded-full"
                  initial={{ opacity: 0, scale: 0, rotate: -90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 1, delay: 1, ease: "easeOut" }}
                >
                  <motion.div
                    className="absolute inset-0 border border-accent-lime/20 rounded-full"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.2, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
                
                <motion.div
                  className="absolute -bottom-8 -left-8 w-20 h-20 bg-accent-lime/15 rounded-full blur-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                />

                {/* Additional floating accent */}
                <motion.div
                  className="absolute top-1/2 -right-12 w-2 h-2 bg-accent-lime/60 rounded-full"
                  animate={{ 
                    y: [-20, 20, -20],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced scroll indicator - mouse style */}
        <motion.div
          className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          style={{ opacity: contentOpacity }}
        >
          {/* Mouse scroll indicator */}
          <motion.div
            className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center pt-2"
            animate={{ borderColor: ["rgba(255,255,255,0.2)", "rgba(255,255,255,0.4)", "rgba(255,255,255,0.2)"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="w-1 h-2 bg-accent-lime/80 rounded-full"
              animate={{ 
                y: [0, 12, 0],
                opacity: [1, 0.3, 1]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
          
          <motion.span 
            className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60 font-light"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
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

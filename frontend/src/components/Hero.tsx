import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import InfiniteTicker from "./InfiniteTicker";
import CircularMenu from "./CircularMenu";
import portraitImage from "@/assets/portrait-nobg.png";
import portraitMobile from "@/assets/about-photo.png";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 30, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 20);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 20);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      <section
        ref={containerRef}
        className="relative h-screen flex flex-col overflow-hidden bg-background"
      >
        {/* ── PHOTO LAYER ── */}
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ x: smoothMouseX, y: smoothMouseY }}
        >
          {/* Desktop: right side full height */}
          <img
            src={portraitImage}
            alt=""
            className="absolute bottom-0 right-0 object-contain hidden md:block"
            style={{ width: "55%", height: "90%", objectPosition: "center top", filter: "brightness(1.05)" }}
          />
          {/* Mobile: full bg, about-photo */}
          <img
            src={portraitMobile}
            alt=""
            className="absolute inset-0 w-full h-full object-cover md:hidden"
            style={{ objectPosition: "65% 8%", opacity: 1, filter: "brightness(1.1)" }}
          />
          {/* Left fade — desktop */}
          <div className="absolute inset-0 hidden md:block" style={{ background: "linear-gradient(90deg, #0a0a0a 0%, #0a0a0a 25%, rgba(10,10,10,0.7) 45%, rgba(10,10,10,0.1) 70%, transparent 100%)" }} />
          {/* Full fade — mobile (stronger so text is readable) */}
          <div className="absolute inset-0 md:hidden" style={{ background: "linear-gradient(90deg, #0a0a0a 0%, rgba(10,10,10,0.95) 40%, rgba(10,10,10,0.6) 100%)" }} />
          {/* Bottom fade — both */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0a0a0a 0%, transparent 30%)" }} />
          {/* Lime glow */}
          <div className="absolute bottom-0 right-0 w-[500px] h-[600px] bg-accent-lime/8 blur-[120px]" />
        </motion.div>

        {/* ── LARGE BG TEXT — desktop only ── */}
        <div className="absolute inset-0 z-[-1] pointer-events-none overflow-hidden flex items-center">
          <motion.span
            className="hidden md:block text-[18vw] font-bold tracking-tighter text-white/[0.025] select-none leading-none px-8 md:px-16 lg:px-24 xl:px-32"
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}>
            AJINKYA
          </motion.span>
        </div>

        <CircularMenu />

        {/* ── MAIN CONTENT ── */}
        <motion.div
          className="relative z-10 flex-1 flex items-center px-6 md:px-16 lg:px-24 xl:px-32"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <div className="max-w-2xl w-full">

            {/* Main heading */}
            <div className="mb-5 overflow-hidden">
              <motion.h1
                className="font-light leading-none tracking-tight"
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}>
                <span className="block text-5xl sm:text-6xl md:text-7xl xl:text-8xl text-white/90">Full-stack</span>
                <span className="block text-5xl sm:text-6xl md:text-7xl xl:text-8xl text-accent-lime italic">Developer.</span>
              </motion.h1>
            </div>

            {/* Divider */}
            <motion.div
              className="h-px bg-gradient-to-r from-accent-lime/60 via-accent-lime/20 to-transparent mb-6"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
              style={{ originX: 0 }} />

            {/* Sub info */}
            <motion.div
              className="flex items-center gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0 }}>
              <span className="text-xs sm:text-sm text-white/40 uppercase tracking-widest">Pune, India</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-xs sm:text-sm text-white/40 uppercase tracking-widest">Open to work</span>
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-accent-lime opacity-60 animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-accent-lime" />
              </span>
            </motion.div>

            {/* CTA */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.2 }}>
              <Link
                to="/works"
                className="group relative inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-accent-lime text-background text-sm font-medium tracking-wide overflow-hidden transition-all duration-300 hover:bg-accent-lime/90">
                <span>View My Work</span>
                <motion.svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </motion.svg>
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 border border-white/10 text-white/60 text-sm tracking-wide hover:border-white/30 hover:text-white/90 transition-all duration-300">
                About Me
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* ── BOTTOM STATS BAR ── */}
        <motion.div
          className="relative z-10 px-6 md:px-16 lg:px-24 xl:px-32 pb-10 sm:pb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.4 }}
          style={{ opacity: contentOpacity }}>
          <div className="flex items-center gap-6 sm:gap-12 border-t border-white/5 pt-6 sm:pt-8">
            {[["50+", "Projects Delivered"], ["2+", "Years Experience"], ["15+", "Happy Clients"]].map(([num, label]) => (
              <div key={label}>
                <div className="text-xl sm:text-2xl font-light text-accent-lime">{num}</div>
                <div className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/30 mt-1">{label}</div>
              </div>
            ))}
            {/* Scroll indicator */}
            <div className="ml-auto flex flex-col items-center gap-2 opacity-40">
              <motion.div
                className="w-5 h-8 border border-white/30 rounded-full flex justify-center pt-1.5"
                animate={{ borderColor: ["rgba(255,255,255,0.2)", "rgba(255,255,255,0.5)", "rgba(255,255,255,0.2)"] }}
                transition={{ duration: 2, repeat: Infinity }}>
                <motion.div
                  className="w-0.5 h-1.5 bg-accent-lime rounded-full"
                  animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }} />
              </motion.div>
              <span className="text-[8px] uppercase tracking-[0.3em] text-white/30">scroll</span>
            </div>
          </div>
        </motion.div>
      </section>

      <InfiniteTicker />
    </>
  );
};

export default Hero;
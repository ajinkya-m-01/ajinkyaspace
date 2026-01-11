import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import MagneticButton from "./MagneticButton";
import WordReveal from "./WordReveal";
import { Mail, Download, ArrowUpRight } from "lucide-react";

const Footer = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const robotRef = useRef<HTMLDivElement>(null);
  const [localTime, setLocalTime] = useState("");
  const [robotRotation, setRobotRotation] = useState({ rotateX: 0, rotateY: 0 });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"]
  });
  
  const nameScale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata"
      };
      setLocalTime(now.toLocaleTimeString("en-US", options) + " IST");
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Robot cursor tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (robotRef.current) {
        const robot = robotRef.current.getBoundingClientRect();
        const robotCenterX = robot.left + robot.width / 2;
        const robotCenterY = robot.top + robot.height / 2;

        const deltaX = e.clientX - robotCenterX;
        const deltaY = e.clientY - robotCenterY;

        const maxRotation = 25;
        const rotateY = Math.max(-maxRotation, Math.min(maxRotation, (deltaX / window.innerWidth) * 50));
        const rotateX = Math.max(-maxRotation, Math.min(maxRotation, -(deltaY / window.innerHeight) * 50));

        setRobotRotation({ rotateX, rotateY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const socials = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ajinkya-mhetre01" },
    { label: "GitHub", href: "https://github.com/ajinkya-m-01" },
    { label: "WhatsApp", href: "https://wa.me/919665248981?text=Hello," },
  ];

  return (
    <footer ref={sectionRef} className="relative bg-secondary overflow-hidden">
      {/* CTA Section */}
      <div className="section-padding py-20 md:py-32 text-center">
        <motion.p
          className="text-editorial-xs text-accent-lime mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          GET IN TOUCH
        </motion.p>
        
        <WordReveal
          text="Let's work together"
          className="text-4xl md:text-6xl lg:text-8xl font-light tracking-tight mb-12"
        />
        
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <MagneticButton>
            <a 
              href="mailto:ajinkyamehetre@email.com"
              className="inline-flex items-center gap-3 px-8 py-4 bg-accent-lime text-background font-medium hover:scale-105 transition-transform duration-300"
            >
              <Mail className="w-5 h-5" />
              <span>ajinkyamehetre@email.com</span>
            </a>
          </MagneticButton>
          
          <MagneticButton>
            <a 
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-3 px-8 py-4 border border-foreground/30 text-foreground btn-invert"
            >
              <Download className="w-5 h-5" />
              <span>Download Resume</span>
            </a>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Giant name with Robot */}
      <motion.div 
        className="text-center px-4 pb-8 relative"
        style={{ scale: nameScale, opacity: nameOpacity }}
      >
        <h2 className="text-giant text-foreground/5 font-megrim select-none relative">
          AJINKYA
        </h2>

        {/* Animated Robot Character - Positioned above first letter */}
        <motion.div
          ref={robotRef}
          className="absolute left-[15%] sm:left-[17%] md:left-[18%] lg:left-[19%] -top-[10%] sm:-top-[12%] md:-top-[15%] lg:-top-[18%] pointer-events-none"
          style={{
            perspective: 1200,
          }}
          initial={{ opacity: 0, scale: 0, y: -50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        >
          <motion.div
            style={{
              rotateX: robotRotation.rotateX,
              rotateY: robotRotation.rotateY,
              transformStyle: 'preserve-3d',
            }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 12,
            }}
            className="relative"
          >
            {/* Robot Body with 3D effect */}
            <div className="relative w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36" style={{ transform: 'rotateY(-15deg) rotateX(5deg)' }}>
              {/* Main Body/Head */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-500 to-green-700 rounded-2xl shadow-2xl border-2 border-green-400/30"
                   style={{ 
                     transform: 'translateZ(20px)',
                     boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 2px 10px rgba(255,255,255,0.2)'
                   }}>
                
                {/* Side panel effect */}
                <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-green-700 to-transparent rounded-l-2xl" />
                <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-b from-green-400 to-transparent rounded-t-2xl" />
                
                {/* Eyes */}
                <motion.div
                  className="absolute top-[25%] left-[22%] w-5 h-5 md:w-7 md:h-7 bg-white rounded-full shadow-lg"
                  animate={{ scale: [1, 0.9, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ 
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2), 0 2px 8px rgba(255,255,255,0.5)',
                    transform: 'translateZ(5px)'
                  }}
                >
                  <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 md:w-3.5 md:h-3.5 bg-black rounded-full" />
                  <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white rounded-full opacity-60" />
                </motion.div>
                <motion.div
                  className="absolute top-[25%] right-[22%] w-5 h-5 md:w-7 md:h-7 bg-white rounded-full shadow-lg"
                  animate={{ scale: [1, 0.9, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ 
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2), 0 2px 8px rgba(255,255,255,0.5)',
                    transform: 'translateZ(5px)'
                  }}
                >
                  <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 md:w-3.5 md:h-3.5 bg-black rounded-full" />
                  <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white rounded-full opacity-60" />
                </motion.div>
                
                {/* Mouth/Display */}
                <div className="absolute bottom-[22%] left-1/2 -translate-x-1/2 w-10 md:w-14 h-2 md:h-3 bg-black/30 rounded-full"
                     style={{ transform: 'translateZ(3px)' }} />
                
                {/* Antenna with glow */}
                <motion.div
                  className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 w-1.5 h-6 md:h-8 bg-gradient-to-t from-green-500 to-green-300"
                  animate={{ rotate: [-8, 8, -8] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ 
                    transformStyle: 'preserve-3d',
                    boxShadow: '0 0 10px rgba(163, 230, 53, 0.6)'
                  }}
                >
                  <motion.div 
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 bg-accent-lime rounded-full"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      boxShadow: ['0 0 10px rgba(163, 230, 53, 0.8)', '0 0 20px rgba(163, 230, 53, 1)', '0 0 10px rgba(163, 230, 53, 0.8)']
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{ transform: 'translateZ(8px)' }}
                  />
                </motion.div>
              </div>

              {/* Base/Neck */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 md:w-12 h-3 md:h-4 bg-gradient-to-b from-green-600 to-green-700 rounded-b-lg"
                   style={{ transform: 'translateZ(10px)' }} />

              {/* Realistic Shadow */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 md:w-28 h-4 md:h-5 bg-black/40 rounded-full blur-xl" 
                   style={{ transform: 'translateZ(0px)' }} />
            </div>

            {/* Floating animation */}
            <motion.div
              className="absolute inset-0"
              animate={{ y: [-3, 3, -3] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom bar */}
      <div className="section-padding py-8 border-t border-border/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          <p className="text-editorial-xs text-muted-foreground">
            © 2024 Ajinkya Mehetre • {localTime}
          </p>
          
          <div className="flex items-center gap-6">
            {socials.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-editorial-xs text-muted-foreground hover:text-foreground underline-animate transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>
          
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-editorial-xs text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <span>Back to top</span>
            <ArrowUpRight className="w-4 h-4 -rotate-45" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

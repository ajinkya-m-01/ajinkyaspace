import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import MagneticButton from "./MagneticButton";

const IntroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-6 py-20 bg-foreground text-background overflow-hidden"
    >
      {/* Curved top edge */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-background" 
        style={{
          clipPath: "ellipse(70% 100% at 50% 0%)"
        }}
      />
      
      <motion.div 
        className="relative max-w-4xl mx-auto text-center"
        style={{ y, opacity }}
      >
        <motion.h2
          className="text-2xl md:text-4xl lg:text-5xl font-light leading-relaxed mb-8 md:mb-12 italic"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          I'm Ajinkya — a Full Stack Developer crafting fast, scalable, and immersive digital experiences that merge creativity with engineering precision.
        </motion.h2>
        
        <motion.p
          className="text-base md:text-lg text-background/70 mb-10 md:mb-14 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          I specialize in developing web applications, AI-driven products, and interactive experiences using technologies like React, Node.js, and modern frameworks.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <MagneticButton strength={0.3}>
            <a
              href="#about"
              className="inline-flex items-center gap-2 bg-accent-lime text-foreground px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-medium hover:scale-105 transition-transform duration-300"
            >
              <span>About Me</span>
              <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
            </a>
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default IntroSection;

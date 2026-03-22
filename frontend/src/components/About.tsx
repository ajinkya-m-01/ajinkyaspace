import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import portraitSeated from "@/assets/portrait-seated.jpg";
import WordReveal from "./WordReveal";

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.05]);

  return (
    <section ref={sectionRef} className="relative bg-secondary overflow-hidden">
      {/* Horizontal scrolling title */}
      <div className="overflow-hidden py-8 md:py-16">
        <motion.div
          className="flex whitespace-nowrap"
          style={{ x: useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]) }}
        >
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-6xl md:text-8xl lg:text-[10rem] font-light tracking-tighter mx-4 md:mx-8">
              FULL STACK DEVELOPER
            </span>
          ))}
        </motion.div>
      </div>
      
      {/* Full-width image with parallax */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="relative"
          style={{ y: imageY, scale: imageScale }}
        >
          <img
            src={portraitSeated}
            alt="Ajinkya Mehetre"
            loading="lazy"
            decoding="async"
            className="w-full h-auto object-contain grayscale"
          />
          {/* Orange gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-transparent mix-blend-overlay" />
        </motion.div>
        
        {/* Decorative circle */}
        <motion.div
          className="absolute left-1/4 top-1/2 -translate-y-1/2 w-16 h-16 md:w-24 md:h-24 border border-foreground/20 rounded-full"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        />
      </div>
      
      {/* About text */}
      <div className="section-padding py-20 md:py-32">
        <div className="max-w-4xl mx-auto">
          <motion.p
            className="text-editorial-xs text-accent-lime mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            ABOUT ME
          </motion.p>
          <WordReveal
            text="I'm a passionate full-stack developer based in Pune, India. I create clean, scalable digital experiences that blend functionality with beautiful design."
            className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-foreground/80"
          />
        </div>
      </div>
    </section>
  );
};

export default About;

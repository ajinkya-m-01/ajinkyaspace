import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Download, ArrowUpRight } from "lucide-react";
import portraitDark from "@/assets/portrait-headshot-dark.jpg";
import SectionTransition from "./SectionTransition";
import HorizontalWipe from "./HorizontalWipe";
import ParallaxImage from "./ParallaxImage";
import MagneticButton from "./MagneticButton";

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const textY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.05]);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Content */}
          <motion.div style={{ y: textY }}>
            <SectionTransition variant="slide-up">
              <p className="text-editorial-xs text-muted-foreground mb-6">
                Contact
              </p>

              <h2 className="text-headline mb-8">
                Let's work together.
              </h2>

              <p className="text-editorial-sm text-muted-foreground mb-10 leading-relaxed">
                I'm currently available for freelance work and exciting 
                project-based opportunities. Whether you need a complete 
                web application or technical consultation, let's create 
                something great.
              </p>
            </SectionTransition>

            {/* Email */}
            <HorizontalWipe direction="left" className="mb-8">
              <a
                href="mailto:ajinkya@example.com"
                className="inline-flex items-center gap-3 text-xl md:text-2xl font-light group"
              >
                <span className="link-underline">ajinkya@example.com</span>
                <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
              </a>
            </HorizontalWipe>

            {/* Social Links */}
            <HorizontalWipe direction="left" className="mb-10">
              <div className="flex gap-8">
                <a
                  href="https://www.linkedin.com/in/ajinkya-mhetre01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-editorial-xs text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/ajinkya-mehetre"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-editorial-xs text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  GitHub
                </a>
                <a
                  href="https://twitter.com/ajinkya_mehetre"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-editorial-xs text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  Twitter
                </a>
              </div>
            </HorizontalWipe>

            {/* Resume Download Button */}
            <HorizontalWipe direction="left">
              <MagneticButton strength={0.4}>
                <motion.a
                  href="/resume.pdf"
                  download="Ajinkya_Mehetre_Resume.pdf"
                  className="inline-flex items-center gap-3 px-6 py-4 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download className="w-4 h-4 group-hover:animate-bounce" />
                  <span className="text-editorial-xs">Download Resume</span>
                </motion.a>
              </MagneticButton>
            </HorizontalWipe>
          </motion.div>

          {/* Image with scale animation */}
          <motion.div
            className="relative aspect-square overflow-hidden hidden md:block"
            style={{ scale: imageScale }}
          >
            <HorizontalWipe direction="right" className="w-full h-full">
              <ParallaxImage
                src={portraitDark}
                alt="Ajinkya Mehetre"
                className="w-full h-full"
                parallaxIntensity={0.1}
                enableTilt={true}
              />
            </HorizontalWipe>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

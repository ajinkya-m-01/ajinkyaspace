import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SectionTransition from "./SectionTransition";
import HorizontalWipe from "./HorizontalWipe";

const experiences = [
  {
    role: "Software Developer",
    company: "Atkind Pvt. Ltd.",
    period: "2024 — Present",
    description: "Building scalable web applications and contributing to product development with a focus on clean, maintainable code.",
  },
  {
    role: "Junior Product Developer Intern",
    company: "Vulnuris Security Solutions LLP",
    period: "2023 — 2024",
    description: "Developed security-focused products and gained hands-on experience with full-stack development practices.",
  },
];

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const lineScaleY = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48 px-6 bg-secondary overflow-hidden">
      {/* Animated timeline line */}
      <motion.div 
        className="absolute left-6 md:left-1/2 top-32 md:top-48 w-px bg-foreground/20 origin-top"
        style={{ 
          scaleY: lineScaleY,
          height: "calc(100% - 16rem)"
        }}
      />
      
      <div className="max-w-4xl mx-auto">
        <SectionTransition variant="slide-up">
          <p className="text-editorial-xs text-muted-foreground mb-6">
            Experience
          </p>

          <h2 className="text-headline mb-16">
            Work History
          </h2>
        </SectionTransition>

        <div className="space-y-12 md:space-y-16">
          {experiences.map((exp, index) => (
            <HorizontalWipe 
              key={exp.company}
              direction={index % 2 === 0 ? "left" : "right"}
            >
              <motion.article
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                className="group"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-8 mb-4">
                  <div>
                    <motion.h3 
                      className="text-xl md:text-2xl font-light group-hover:tracking-wide transition-all duration-500"
                    >
                      {exp.role}
                    </motion.h3>
                    <p className="text-editorial-sm text-muted-foreground">
                      {exp.company}
                    </p>
                  </div>
                  <p className="text-editorial-xs text-muted-foreground md:text-right whitespace-nowrap">
                    {exp.period}
                  </p>
                </div>
                <p className="text-editorial-sm text-muted-foreground max-w-2xl">
                  {exp.description}
                </p>
                
                {/* Subtle hover line */}
                <motion.div 
                  className="h-px bg-foreground/20 mt-8 origin-left"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  viewport={{ once: true }}
                />
              </motion.article>
            </HorizontalWipe>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import WordReveal from "./WordReveal";

const experiences = [
  {
  role: "Technical Lead & Co-Founder",
  company: "Atkind Pvt. Ltd.",
  period: "2025 — Present",
  description: "Leading technical architecture and development while co-founding the company, overseeing end-to-end product engineering, code quality, and delivery of scalable, production-ready web solutions."
  },
  {
    role: "Junior Product Developer Intern",
    company: "Vulnuris Security Solutions LLP",
    period: "Nov 2025 — Jan 2026",
    description: "Developed security-focused products and gained hands-on experience with full-stack development practices.",
  },
];

const ExperienceTimeline = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const pathLength = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 section-padding overflow-hidden bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.p
            className="text-editorial-xs text-accent-lime mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
           style={{ willChange: "transform, opacity" }}>
            EXPERIENCE
          </motion.p>
          <WordReveal
            text="Where I've Worked"
            className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight"
          />
        </div>

        {/* Timeline with curved SVG */}
        <div className="relative">
          {/* Curved SVG path */}
          <svg
            className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 h-full w-20 md:w-32"
            viewBox="0 0 100 800"
            preserveAspectRatio="none"
            fill="none"
          >
            <motion.path
              d="M50 0 
                 C 50 100, 80 150, 50 200
                 C 20 250, 50 300, 50 400
                 C 50 500, 20 550, 50 600
                 C 80 650, 50 700, 50 800"
              stroke="hsl(68 91% 58%)"
              strokeWidth="20"
              strokeLinecap="round"
              fill="none"
              style={{ willChange: "transform, opacity", pathLength }}
            />
          </svg>

          {/* Experience items */}
          <div className="relative space-y-16 md:space-y-24 pl-24 md:pl-0">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                className={`relative md:w-1/2 ${index % 2 === 0 ? 'md:ml-auto md:pl-16' : 'md:mr-auto md:pr-16 md:text-right'}`}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                style={{ willChange: "transform, opacity", transformStyle: "preserve-3d", transformOrigin: "bottom" }}
              >
                {/* Dot on timeline */}
                <motion.div
                  className={`absolute top-2 w-4 h-4 rounded-full bg-foreground ${index % 2 === 0 ? 'md:-left-8 left-[-5rem]' : 'md:-right-8 left-[-5rem]'}`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.2 }}
                  viewport={{ once: true }}
                 style={{ willChange: "transform, opacity" }} />
                
                <div className="timeline-3d">
                  <p className="text-editorial-xs text-muted-foreground mb-2">
                    {exp.period}
                  </p>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-light mb-2 text-accent-lime">
                    {exp.role}
                  </h3>
                  <p className="text-lg md:text-xl text-foreground/80 mb-4">
                    {exp.company}
                  </p>
                  <p className="text-editorial-sm text-muted-foreground">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;

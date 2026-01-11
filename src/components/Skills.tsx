import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import StaggerContainer from "./StaggerContainer";
import SectionTransition from "./SectionTransition";

const skills = [
  { category: "Frontend", items: ["React.js", "JavaScript", "TypeScript", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Express.js", "REST APIs", "MongoDB"] },
  { category: "Tools", items: ["Git", "GitHub", "VS Code", "Postman"] },
  { category: "Practices", items: ["Clean Code", "Responsive Design", "Version Control", "Agile"] },
];

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48 px-6 bg-secondary overflow-hidden">
      {/* Decorative line */}
      <motion.div 
        className="absolute left-0 top-0 w-px h-full bg-foreground/10"
        style={{ scaleY: scrollYProgress }}
        initial={{ originY: 0 }}
      />
      
      <motion.div className="max-w-4xl mx-auto" style={{ y }}>
        <SectionTransition variant="slide-up">
          <p className="text-editorial-xs text-muted-foreground mb-6">
            Expertise
          </p>

          <h2 className="text-headline mb-16">
            Skills & Technologies
          </h2>
        </SectionTransition>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {skills.map((skillGroup, groupIndex) => (
            <SectionTransition 
              key={skillGroup.category} 
              variant="slide-up"
            >
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: groupIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-editorial-xs text-foreground mb-6">
                  {skillGroup.category}
                </h3>
                <StaggerContainer className="space-y-3" staggerDelay={0.05}>
                  {skillGroup.items.map((skill) => (
                    <p
                      key={skill}
                      className="text-editorial-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                      {skill}
                    </p>
                  ))}
                </StaggerContainer>
              </motion.div>
            </SectionTransition>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;

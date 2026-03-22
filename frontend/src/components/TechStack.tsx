import { motion } from "framer-motion";
import { 
  Code2, 
  Palette, 
  Database, 
  Server, 
  Shield, 
  Layers,
  FileCode,
  Boxes
} from "lucide-react";

interface TechItem {
  name: string;
  icon: typeof Code2;
}

interface TechCategory {
  title: string;
  items: TechItem[];
}

const mernStack: TechCategory[] = [
  {
    title: "Core Stack",
    items: [
      { name: "React.js", icon: Code2 },
      { name: "Node.js", icon: Server },
      { name: "Express.js", icon: Server },
      { name: "MongoDB", icon: Database },
    ],
  },
];

const javaStack: TechCategory[] = [
  {
    title: "Core Stack",
    items: [
      { name: "Java", icon: Code2 },
      { name: "Spring Boot", icon: Boxes },
      { name: "Hibernate", icon: Database },
      { name: "MySQL", icon: Database },
    ],
  },
];

interface TechCardProps {
  item: TechItem;
  index: number;
}

const TechCard = ({ item, index }: TechCardProps) => {
  const Icon = item.icon;
  
  return (
    <motion.div
      className="group relative bg-foreground/5 border border-foreground/10 p-4 hover:bg-foreground/10 hover:border-accent-lime/50 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
     style={{ willChange: "transform, opacity" }}>
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-accent-lime/10 border border-accent-lime/30 group-hover:bg-accent-lime/20 transition-colors duration-300">
          <Icon className="w-5 h-5 text-accent-lime" />
        </div>
        <span className="text-sm md:text-base font-medium text-foreground/90 group-hover:text-foreground transition-colors duration-300">
          {item.name}
        </span>
      </div>
    </motion.div>
  );
};

interface StackSectionProps {
  title: string;
  categories: TechCategory[];
  delay?: number;
}

const StackSection = ({ title, categories, delay = 0 }: StackSectionProps) => {
  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
     style={{ willChange: "transform, opacity" }}>
      {/* Section Title */}
      <motion.h3
        className="text-2xl md:text-3xl font-light text-foreground border-l-4 border-accent-lime pl-4"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay + 0.1 }}
       style={{ willChange: "transform, opacity" }}>
        {title}
      </motion.h3>

      {/* Categories Grid */}
      <div className="grid gap-8">
        {categories.map((category, categoryIndex) => (
          <div key={category.title} className="space-y-4">
            <motion.h4
              className="text-xs md:text-sm uppercase tracking-wider text-accent-lime font-medium"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: delay + categoryIndex * 0.1 }}
             style={{ willChange: "transform, opacity" }}>
              {category.title}
            </motion.h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {category.items.map((item, itemIndex) => (
                <TechCard 
                  key={item.name} 
                  item={item} 
                  index={itemIndex} 
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const TechStack = () => {
  return (
    <section className="py-20 md:py-32 px-6 md:px-12 lg:px-20 xl:px-32 bg-background">
      <div className="w-full max-w-screen-2xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <motion.p
            className="text-xs md:text-sm uppercase tracking-wider text-accent-lime mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
           style={{ willChange: "transform, opacity" }}>
            Technology Expertise
          </motion.p>
          
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
           style={{ willChange: "transform, opacity" }}>
            Tech Stack
          </motion.h2>
          
          <motion.p
            className="text-base md:text-lg text-foreground/70 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
           style={{ willChange: "transform, opacity" }}>
            Full-stack development expertise across modern JavaScript and enterprise Java ecosystems.
          </motion.p>
        </div>

        {/* Stacks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24">
          <StackSection 
            title="MERN Stack" 
            categories={mernStack} 
            delay={0.2}
          />
          
          <StackSection 
            title="Java Full-Stack" 
            categories={javaStack} 
            delay={0.4}
          />
        </div>

        {/* Divider */}
        <motion.div
          className="mt-20 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
         style={{ willChange: "transform, opacity" }} />
      </div>
    </section>
  );
};

export default TechStack;

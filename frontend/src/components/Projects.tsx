import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, Building2, ShoppingCart, GraduationCap, Brain, Gamepad2, Globe, Code } from "lucide-react";
import WordReveal from "./WordReveal";
import MagneticButton from "./MagneticButton";

const projectCategories = [
  {
    name: "🌐 Corporate & Business",
    icon: Building2,
    projects: [
      { title: "Aivors", category: "Corporate Website", url: "https://www.aivors.com/", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80" },
      { title: "XAction", category: "Business Platform", url: "https://www.xaction.in/", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80" },
      { title: "SRINC", category: "Corporate Website", url: "https://srinc.in", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&auto=format&fit=crop&q=80" },
      { title: "Rohum.tech", category: "Tech Business", url: "https://rohum.tech", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80" },
      { title: "Wristband", category: "Product Platform", url: "https://www.wristband.com/", image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80" },
      { title: "Sports Gear Swag", category: "E-commerce", url: "https://www.sportsgearswag.com/", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=80" },
    ]
  },
  {
    name: "🛒 E-commerce & Products",
    icon: ShoppingCart,
    projects: [
      { title: "FairPlace", category: "E-commerce Platform", url: "https://fairplace.in", image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format&fit=crop&q=80" },
      { title: "FairPlace Medical", category: "Medical E-commerce", url: "https://fairplace-med.netlify.app", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80" },
      { title: "Hotel 23K", category: "Hospitality Platform", url: "https://hotel23k.netlify.app", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80" },
      { title: "Karigari Demo", category: "Product Showcase", url: "https://karigaridemo.netlify.app", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80" },
    ]
  },
  {
    name: "🎓 Education & Learning",
    icon: GraduationCap,
    projects: [
      { title: "AI Learning Platform", category: "EdTech", url: "https://learningplatformofai.netlify.app/", image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80" },
      { title: "German Classes Portal", category: "Language Learning", url: "https://adityasirgermanclasses.netlify.app", image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&auto=format&fit=crop&q=80" },
      { title: "DCE Educational Portal", category: "Education Platform", url: "https://dce2.netlify.app", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80" },
      { title: "CodePrep", category: "Interview Prep App", url: "#", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80", isMobileApp: true },
    ]
  },
  {
    name: "🤖 AI, Data & Tech",
    icon: Brain,
    projects: [
      { title: "Data Visualization Tool", category: "Data Analytics", url: "https://visualizationtooldata.netlify.app/", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80" },
      { title: "Today's AI", category: "AI Platform", url: "https://todaysai.netlify.app", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80" },
      { title: "Astro Project", category: "Tech Innovation", url: "https://astroproject155.netlify.app", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80" },
    ]
  },
  {
    name: "🎮 Gaming & Entertainment",
    icon: Gamepad2,
    projects: [
      { title: "WinWitty", category: "Gaming Platform", url: "#", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80", isMobileApp: true },
      { title: "GameHub", category: "Multi-Game Platform", url: "#", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80", isMobileApp: true },
    ]
  },
  {
    name: "🌍 Travel & Lifestyle",
    icon: Globe,
    projects: [
      { title: "ExploreSphere", category: "Travel Platform", url: "https://exploresphere.netlify.app", image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop&q=80" },
      { title: "AdiYogInGo", category: "Wellness Platform", url: "https://adiyogingo.netlify.app", image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&auto=format&fit=crop&q=80" },
      { title: "LivelyK", category: "Lifestyle Platform", url: "https://livelyk.netlify.app", image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=800&auto=format&fit=crop&q=80" },
    ]
  },
  {
    name: "🧩 CMS & Demo Sites",
    icon: Code,
    projects: [
      { title: "WordPress NA", category: "CMS Development", url: "https://wordpressna.netlify.app", image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&auto=format&fit=crop&q=80" },
    ]
  }
];

interface ProjectCardProps {
  project: {
    title: string;
    category: string;
    url: string;
    image: string;
    isMobileApp?: boolean;
  };
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={cardRef}
      className="project-card group relative overflow-hidden"
      style={{ y, opacity }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.05 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <motion.a 
        href={project.isMobileApp ? "#" : project.url} 
        target={project.isMobileApp ? "_self" : "_blank"}
        rel="noopener noreferrer"
        className="block relative aspect-[4/3] overflow-hidden rounded-lg"
        style={{ rotateX }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4 }}
      >
        {/* Image with parallax */}
        <motion.div
          className="absolute inset-0"
          animate={{
            scale: isHovered ? 1.15 : 1,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-80" />
        
        {/* Animated gradient on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-accent-lime/20 via-orange-500/20 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <motion.p
            className="text-xs text-muted-foreground mb-2 tracking-wide uppercase"
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {project.category}
          </motion.p>
          
          <motion.h3
            className="text-xl md:text-2xl font-light text-foreground mb-2"
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            {project.title}
          </motion.h3>

          {project.isMobileApp && (
            <motion.span 
              className="inline-flex items-center gap-1 text-xs text-accent-lime"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              📱 Mobile App
            </motion.span>
          )}
        </div>
        
        {/* Corner accent */}
        <motion.div
          className="absolute top-4 right-4 w-12 h-12 rounded-full bg-accent-lime/10 backdrop-blur-sm flex items-center justify-center border border-accent-lime/30"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ 
            scale: isHovered ? 1 : 0,
            rotate: isHovered ? 0 : -180
          }}
          transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
        >
          <ArrowUpRight className="w-5 h-5 text-accent-lime" />
        </motion.div>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
          }}
          animate={{
            x: isHovered ? ["0%", "200%"] : "0%",
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </motion.a>
    </motion.div>
  );
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-32 section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <motion.p
            className="text-editorial-xs text-accent-lime mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            SELECTED WORK
          </motion.p>
          <WordReveal
            text="Featured Projects"
            className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6"
          />
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            A collection of {projectCategories.reduce((acc, cat) => acc + cat.projects.length, 0)}+ projects across multiple domains
          </motion.p>
        </div>

        {/* Project Categories */}
        {projectCategories.map((category, categoryIndex) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.name}
              className="mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Category Header */}
              <motion.div 
                className="flex items-center gap-4 mb-8 cursor-pointer group"
                onClick={() => setActiveCategory(activeCategory === categoryIndex ? null : categoryIndex)}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="w-12 h-12 rounded-full bg-accent-lime/10 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className="w-6 h-6 text-accent-lime" />
                </motion.div>
                <h3 className="text-2xl md:text-3xl font-light text-foreground group-hover:text-accent-lime transition-colors">
                  {category.name}
                </h3>
                <motion.div
                  className="ml-auto text-sm text-muted-foreground"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {category.projects.length} projects
                </motion.div>
              </motion.div>

              {/* Projects Grid */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                layout
              >
                {category.projects.map((project, index) => (
                  <ProjectCard 
                    key={project.title} 
                    project={project} 
                    index={index} 
                  />
                ))}
              </motion.div>

              {/* Divider */}
              {categoryIndex < projectCategories.length - 1 && (
                <motion.div
                  className="h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent mt-20"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  viewport={{ once: true }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Building2, ShoppingCart, GraduationCap, Brain, Gamepad2, Globe, Code } from "lucide-react";
import WordReveal from "./WordReveal";

const API_URL = import.meta.env.VITE_API_URL || "https://portfolio-master-l7rq.onrender.com";

const categoryConfigs = [
  { name: "Corporate & Business", icon: Building2 },
  { name: "E-commerce & Products", icon: ShoppingCart },
  { name: "Education & Learning", icon: GraduationCap },
  { name: "AI Data & Tech", icon: Brain },
  { name: "Gaming & Entertainment", icon: Gamepad2 },
  { name: "Travel & Lifestyle", icon: Globe },
  { name: "CMS & Demo Sites", icon: Code },
];

const normalizeCategory = (categoryName: string) =>
  categoryName.replace(/[^\w\s&]/g, "").replace(/\s+/g, " ").trim().toLowerCase();

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

type ApiProject = ProjectCardProps["project"] & {
  _id: string;
  status: string;
};

interface ProjectCategory {
  name: string;
  icon: typeof Building2;
  projects: ProjectCardProps["project"][];
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
      style={{ willChange: "transform, opacity", y, opacity }}
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
        style={{ willChange: "transform, opacity", rotateX }}
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
         style={{ willChange: "transform, opacity" }}>
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
         style={{ willChange: "transform, opacity" }} />
        
        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <motion.p
            className="text-xs text-muted-foreground mb-2 tracking-wide uppercase"
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.3 }}
           style={{ willChange: "transform, opacity" }}>
            {project.category}
          </motion.p>
          
          <motion.h3
            className="text-xl md:text-2xl font-light text-foreground mb-2"
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
           style={{ willChange: "transform, opacity" }}>
            {project.title}
          </motion.h3>

          {project.isMobileApp && (
            <motion.span 
              className="inline-flex items-center gap-1 text-xs text-accent-lime"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
             style={{ willChange: "transform, opacity" }}>
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
         style={{ willChange: "transform, opacity" }}>
          <ArrowUpRight className="w-5 h-5 text-accent-lime" />
        </motion.div>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ willChange: "transform, opacity", background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)", }}
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
  const [projectCategories, setProjectCategories] = useState<ProjectCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/projects?status=active`);

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const payload: { data?: ApiProject[] } = await response.json();
      const projects = Array.isArray(payload.data) ? payload.data : [];

      const normalizedCategoryLookup = new Map(
        categoryConfigs.map((config) => [normalizeCategory(config.name), config])
      );

      const groupedProjects = projects.reduce<Record<string, ProjectCardProps["project"][]>>(
        (acc, project) => {
          const matchedCategory = normalizedCategoryLookup.get(normalizeCategory(project.category));

          if (!matchedCategory) {
            return acc;
          }

          if (!acc[matchedCategory.name]) {
            acc[matchedCategory.name] = [];
          }

          acc[matchedCategory.name].push({
            title: project.title,
            category: project.category,
            url: project.url,
            image: project.image,
            isMobileApp: project.isMobileApp,
          });

          return acc;
        },
        {}
      );

      const orderedCategories = categoryConfigs
        .map((config) => ({
          name: config.name,
          icon: config.icon,
          projects: groupedProjects[config.name] || [],
        }))
        .filter((category) => category.projects.length > 0);

      setProjectCategories(orderedCategories);
    } catch {
      setProjectCategories([]);
      setError("Unable to load projects right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const totalProjects = projectCategories.reduce((acc, category) => acc + category.projects.length, 0);

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
           style={{ willChange: "transform, opacity" }}>
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
           style={{ willChange: "transform, opacity" }}>
            A collection of {totalProjects}+ projects across multiple domains
          </motion.p>
        </div>

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="project-card group relative overflow-hidden animate-pulse">
                <div className="block relative aspect-[4/3] overflow-hidden rounded-lg bg-foreground/10" />
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="mb-12 text-center">
            <p className="text-muted-foreground">{error}</p>
            <button
              onClick={fetchProjects}
              className="mt-4 inline-flex items-center rounded-lg border border-accent-lime/40 px-5 py-2 text-sm text-foreground hover:bg-accent-lime/10 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Project Categories */}
        {!loading &&
          !error &&
          projectCategories.map((category, categoryIndex) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.name}
              className="mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
             style={{ willChange: "transform, opacity" }}>
              {/* Category Header */}
              <motion.div 
                className="flex items-center gap-4 mb-8 cursor-pointer group"
                onClick={() => setActiveCategory(activeCategory === categoryIndex ? null : categoryIndex)}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
               style={{ willChange: "transform, opacity" }}>
                <motion.div
                  className="w-12 h-12 rounded-full bg-accent-lime/10 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                 style={{ willChange: "transform, opacity" }}>
                  <Icon className="w-6 h-6 text-accent-lime" />
                </motion.div>
                <h3 className="text-2xl md:text-3xl font-light text-foreground group-hover:text-accent-lime transition-colors">
                  {category.name}
                </h3>
                <motion.div
                  className="ml-auto text-sm text-muted-foreground"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                 style={{ willChange: "transform, opacity" }}>
                  {category.projects.length} projects
                </motion.div>
              </motion.div>

              {/* Projects Grid */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                layout
               style={{ willChange: "transform, opacity" }}>
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
                 style={{ willChange: "transform, opacity" }} />
              )}
            </motion.div>
          );
          })}
      </div>
    </section>
  );
};

export default Projects;

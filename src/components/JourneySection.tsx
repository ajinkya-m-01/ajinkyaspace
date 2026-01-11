import { motion } from "framer-motion";
import { 
  BookOpen, 
  Code, 
  Layers, 
  Briefcase, 
  Rocket, 
  FolderGit2, 
  Users, 
  Sparkles 
} from "lucide-react";

interface JourneyStep {
  icon: typeof BookOpen;
  title: string;
  phase: string;
  description: string;
  technologies: string[];
}

const journeySteps: JourneyStep[] = [
  {
    icon: BookOpen,
    title: "Foundations",
    phase: "Beginning",
    description: "Started with Core Java and SQL. Focused on OOP concepts, problem-solving, and database fundamentals.",
    technologies: ["Core Java", "SQL", "OOP", "JDBC"],
  },
  {
    icon: Code,
    title: "Web Development Entry",
    phase: "Learning Phase",
    description: "Learned HTML, CSS, JavaScript, and Bootstrap. Built small practice projects and static websites.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
  },
  {
    icon: Layers,
    title: "Full-Stack Transition",
    phase: "Growth Phase",
    description: "Learned MERN Stack. Built authentication systems, REST APIs, dashboards, and role-based apps.",
    technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT"],
  },
  {
    icon: Briefcase,
    title: "Real-World Experience",
    phase: "Internship",
    description: "Junior Product Developer internship. Worked on real client projects, API integrations, authentication flows, and scalable architecture.",
    technologies: ["REST APIs", "Authentication", "Client Projects", "Scalable Systems"],
  },
  {
    icon: Rocket,
    title: "Professional Role",
    phase: "Software Developer",
    description: "Software Developer at a startup. End-to-end development, client handling, deployment, and production-ready builds.",
    technologies: ["Full-Stack", "Deployment", "Production", "Client Management"],
  },
  {
    icon: FolderGit2,
    title: "Key Projects",
    phase: "Advanced Projects",
    description: "AI Voice Automation Platform with real-time calls, WebSockets, LLM workflows. Multi-role Quiz Management System with JWT auth and Socket.IO.",
    technologies: ["WebSockets", "Socket.IO", "AI/LLM", "Real-time Systems"],
  },
  {
    icon: Users,
    title: "Freelancing & Collaboration",
    phase: "Freelance Work",
    description: "Freelance projects and startup collaborations. Business-focused, performance-optimized solutions.",
    technologies: ["Freelancing", "Startups", "Performance Optimization", "Business Solutions"],
  },
  {
    icon: Sparkles,
    title: "Present & Future",
    phase: "Current Focus",
    description: "Building scalable, AI-powered web applications. Focus on clean code, performance, system design, and global freelancing.",
    technologies: ["System Design", "AI Integration", "Clean Code", "Global Freelancing"],
  },
];

interface TimelineStepProps {
  step: JourneyStep;
  index: number;
}

const TimelineStep = ({ step, index }: TimelineStepProps) => {
  const Icon = step.icon;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      className="relative flex items-start gap-6 md:gap-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Timeline Line and Dot */}
      <div className="relative flex flex-col items-center flex-shrink-0">
        {/* Vertical Line */}
        {index !== journeySteps.length - 1 && (
          <motion.div
            className="absolute top-16 left-1/2 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-accent-lime to-transparent"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
            style={{ originY: 0 }}
          />
        )}
        
        {/* Icon Circle */}
        <motion.div
          className="relative z-10 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-accent-lime/10 border-2 border-accent-lime rounded-full group-hover:bg-accent-lime/20 transition-colors duration-300"
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <Icon className="w-6 h-6 md:w-7 md:h-7 text-accent-lime" />
        </motion.div>
      </div>

      {/* Content Card */}
      <motion.div
        className="group flex-1 bg-foreground/5 border border-foreground/10 p-6 md:p-8 hover:bg-foreground/10 hover:border-accent-lime/50 transition-all duration-300"
        whileHover={{ x: isEven ? 5 : -5, y: -5 }}
      >
        {/* Phase Badge */}
        <motion.span
          className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider bg-accent-lime/20 text-accent-lime border border-accent-lime/30 mb-4"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
        >
          {step.phase}
        </motion.span>

        {/* Title */}
        <motion.h3
          className="text-xl md:text-2xl font-medium text-foreground mb-3 group-hover:text-accent-lime transition-colors duration-300"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
        >
          {step.title}
        </motion.h3>

        {/* Description */}
        <motion.p
          className="text-sm md:text-base text-foreground/70 leading-relaxed mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
        >
          {step.description}
        </motion.p>

        {/* Technologies */}
        <motion.div
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
        >
          {step.technologies.map((tech, techIndex) => (
            <motion.span
              key={tech}
              className="px-3 py-1 text-xs bg-foreground/10 text-foreground/80 border border-foreground/20 hover:border-accent-lime/50 transition-colors duration-200"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.6 + techIndex * 0.05 }}
              whileHover={{ scale: 1.05 }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const JourneySection = () => {
  return (
    <section className="py-20 md:py-32 px-6 md:px-12 lg:px-20 xl:px-32 bg-background">
      <div className="w-full max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <motion.p
            className="text-xs md:text-sm uppercase tracking-wider text-accent-lime mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            My Journey
          </motion.p>
          
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            From Fundamentals to Production
          </motion.h2>
          
          <motion.p
            className="text-base md:text-lg text-foreground/70 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            My evolution as a developer — from learning the basics to building real-world, 
            production-level applications.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="space-y-8 md:space-y-12">
          {journeySteps.map((step, index) => (
            <TimelineStep key={step.title} step={step} index={index} />
          ))}
        </div>

        {/* Footer Divider */}
        <motion.div
          className="mt-20 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
    </section>
  );
};

export default JourneySection;

import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CursorFollower from "@/components/CursorFollower";
import ScrollLine from "@/components/ScrollLine";
import portraitImage from "@/assets/about-photo.png";

const About = () => {
  return (
    <PageTransition>
      <CursorFollower />
      <ScrollLine />
      <div className="noise-overlay" />
      <main className="relative cursor-none md:cursor-none">
        <Navigation />
        
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20 xl:px-32 pt-32 pb-20 bg-background">
          <div className="w-full max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center">
            {/* Left: Text content */}
            <motion.div 
              className="flex flex-col justify-center space-y-6 md:space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.p
                className="text-xs md:text-sm uppercase tracking-wider text-accent-lime"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Get to know me
              </motion.p>

              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-light tracking-tight leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                About Me
              </motion.h1>

              <motion.div
                className="space-y-4 text-base md:text-lg text-foreground/80 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <p>
                  I'm Ajinkya — a Full Stack Developer crafting fast, scalable, and immersive 
                  digital experiences that merge creativity with engineering precision.
                </p>
                <p>
                  I specialize in developing web applications, AI-driven products, and interactive 
                  experiences using technologies like React, Node.js, and modern frameworks.
                </p>
                <p>
                  With a passion for clean code and user-centric design, I bring ideas to life 
                  through thoughtful architecture and attention to detail.
                </p>
              </motion.div>
            </motion.div>

            {/* Right: Profile image */}
            <motion.div
              className="flex items-center justify-center lg:justify-end"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
                <motion.div
                  className="relative overflow-hidden rounded-lg"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                >
                  <img
                    src={portraitImage}
                    alt="Ajinkya Mehetre"
                    className="w-full h-auto"
                  />
                </motion.div>
              
                {/* Decorative elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-24 h-24 border border-accent-lime/50 rounded-full"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.8 }}
                />
                <motion.div
                  className="absolute -bottom-6 -left-6 w-16 h-16 bg-accent-lime/20 rounded-full blur-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills & Expertise Section */}
        <section className="py-20 px-6 md:px-12 lg:px-20 xl:px-32 bg-foreground text-background">
          <div className="w-full max-w-screen-2xl mx-auto">
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-light mb-12 md:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              What I Do
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {[
                {
                  title: "Full-Stack Development",
                  description: "Building scalable web applications with modern frameworks and best practices.",
                  delay: 0.2
                },
                {
                  title: "UI/UX Design",
                  description: "Creating intuitive and beautiful user interfaces that enhance user experience.",
                  delay: 0.3
                },
                {
                  title: "AI Integration",
                  description: "Implementing AI-driven solutions and intelligent features into applications.",
                  delay: 0.4
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="space-y-4"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: item.delay }}
                >
                  <h3 className="text-xl md:text-2xl font-medium text-background">{item.title}</h3>
                  <p className="text-background/70 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
};

export default About;

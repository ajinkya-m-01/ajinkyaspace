import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CursorFollower from "@/components/CursorFollower";
import ScrollLine from "@/components/ScrollLine";
import Projects from "@/components/Projects";

const Works = () => {
  return (
    <PageTransition>
      <CursorFollower />
      <ScrollLine />
      <div className="noise-overlay" />
      <main className="relative cursor-none md:cursor-none">
        <Navigation />
        
        {/* Hero Section */}
        <section className="min-h-[60vh] flex items-center justify-center px-6 md:px-12 lg:px-20 xl:px-32 pt-32 pb-20 bg-background">
          <div className="w-full max-w-screen-2xl mx-auto text-center">
            <motion.p
              className="text-xs md:text-sm uppercase tracking-wider text-accent-lime mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              My Portfolio
            </motion.p>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Selected Works
            </motion.h1>

            <motion.p
              className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              A collection of projects that showcase my expertise in full-stack development, 
              UI/UX design, and innovative problem-solving.
            </motion.p>
          </div>
        </section>

        {/* Projects Section */}
        <Projects />

        <Footer />
      </main>
    </PageTransition>
  );
};

export default Works;

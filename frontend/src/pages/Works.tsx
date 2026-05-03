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
      <main className="relative relative">
        <Navigation />
        
        {/* Projects Section */}
        <Projects />

        <Footer />
      </main>
    </PageTransition>
  );
};

export default Works;

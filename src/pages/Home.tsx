import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import JourneySection from "@/components/JourneySection";
import Footer from "@/components/Footer";
import CursorFollower from "@/components/CursorFollower";
import PageTransition from "@/components/PageTransition";
import ScrollLine from "@/components/ScrollLine";

const Home = () => {
  return (
    <PageTransition>
      <CursorFollower />
      <ScrollLine />
      <div className="noise-overlay" />
      <main className="relative cursor-none md:cursor-none">
        <Navigation />
        <Hero />
        <div id="about">
          <About />
        </div>
        <TechStack />
        <ExperienceTimeline />
        <JourneySection />
        <div id="contact">
          <Footer />
        </div>
      </main>
    </PageTransition>
  );
};

export default Home;

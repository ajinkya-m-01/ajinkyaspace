import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoImage from "@/assets/A Logo.png";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger loaded state after a brief delay for smooth entrance
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (path: string) => {
    setIsMenuOpen(false);
    
    // If clicking Home while on Home page, smooth scroll to top
    if (path === "/" && location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(path);
    }
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Works", path: "/works" },
    { label: "Services", path: "/services" },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <>
      {/* Main Navigation */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled 
            ? "bg-background/95 backdrop-blur-md border-b border-foreground/10 shadow-lg" 
            : "bg-transparent"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: isLoaded ? 0 : -100, opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
       style={{ willChange: "transform, opacity" }}>
        <nav className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-between h-20 md:h-24">
            
            {/* Logo */}
            <motion.div
              className="relative z-50 cursor-pointer"
              variants={logoVariants}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavClick("/")}
             style={{ willChange: "transform, opacity" }}>
              <img 
                src={logoImage} 
                alt="Ajinkya Mehetre" 
                width="48"
                height="48"
                className="h-10 md:h-12 w-auto"
              />
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div 
              className="hidden md:flex items-center gap-1 lg:gap-2"
              variants={containerVariants}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
             style={{ willChange: "transform, opacity" }}>
              {navItems.map((item) => (
                <motion.button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`relative px-4 lg:px-6 py-2 text-sm lg:text-base font-medium transition-colors group ${
                    isActive(item.path) 
                      ? "text-foreground" 
                      : "text-foreground/80 hover:text-foreground"
                  }`}
                  variants={itemVariants}
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                 style={{ willChange: "transform, opacity" }}>
                  {item.label}
                  <motion.span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-accent-lime"
                    initial={{ width: isActive(item.path) ? "75%" : "0%" }}
                    animate={{ width: isActive(item.path) ? "75%" : "0%" }}
                    whileHover={{ width: "75%" }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                   style={{ willChange: "transform, opacity" }} />
                </motion.button>
              ))}
              
              {/* Contact Button */}
              <motion.button
                onClick={() => handleNavClick("/contact")}
                className="ml-2 lg:ml-4 px-5 lg:px-7 py-2.5 lg:py-3 bg-foreground text-background text-sm lg:text-base font-semibold rounded-full hover:bg-accent-lime hover:text-foreground transition-all duration-500 shadow-lg hover:shadow-xl"
                variants={itemVariants}
                whileHover={{ y: -2, scale: 1.05, transition: { duration: 0.3 } }}
                whileTap={{ scale: 0.95 }}
               style={{ willChange: "transform, opacity" }}>
                Contact →
              </motion.button>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Open menu"
              className="md:hidden w-12 h-12 flex items-center justify-center rounded-full bg-foreground text-background z-50 shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileTap={{ scale: 0.9 }}
             style={{ willChange: "transform, opacity" }}>
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                   style={{ willChange: "transform, opacity" }}>
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                   style={{ willChange: "transform, opacity" }}>
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
           style={{ willChange: "transform, opacity" }}>
            <motion.div 
              className="flex flex-col items-center justify-center h-full gap-8 px-8"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.1 },
                },
              }}
             style={{ willChange: "transform, opacity" }}>
              {navItems.map((item) => (
                <motion.button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`text-4xl font-light transition-colors ${
                    isActive(item.path) 
                      ? "text-accent-lime" 
                      : "text-foreground hover:text-accent-lime"
                  }`}
                  variants={{
                    hidden: { opacity: 0, x: -50 },
                    visible: { 
                      opacity: 1, 
                      x: 0, 
                      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
                    },
                  }}
                  whileHover={{ x: 10, transition: { duration: 0.2 } }}
                 style={{ willChange: "transform, opacity" }}>
                  {item.label}
                </motion.button>
              ))}
              
              <motion.button
                onClick={() => handleNavClick("/contact")}
                className="mt-8 px-10 py-4 bg-accent-lime text-foreground text-xl font-semibold rounded-full shadow-xl"
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { 
                    opacity: 1, 
                    scale: 1, 
                    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
                  },
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
               style={{ willChange: "transform, opacity" }}>
                Contact →
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;

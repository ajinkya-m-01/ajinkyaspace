import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoImage from "@/assets/A Logo.png";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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

  return (
    <>
      {/* Main Navigation */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? "bg-background/95 backdrop-blur-md border-b border-foreground/10 shadow-lg" 
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <nav className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-between h-20 md:h-24">
            
            {/* Logo */}
            <motion.div
              className="relative z-50 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavClick("/")}
            >
              <img 
                src={logoImage} 
                alt="Ajinkya Mehetre" 
                className="h-10 md:h-12 w-auto"
              />
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`relative px-4 lg:px-6 py-2 text-sm lg:text-base font-medium transition-colors group ${
                    isActive(item.path) 
                      ? "text-foreground" 
                      : "text-foreground/80 hover:text-foreground"
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  whileHover={{ y: -2 }}
                >
                  {item.label}
                  <motion.span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-accent-lime transition-all duration-300 ${
                      isActive(item.path) ? "w-3/4" : "w-0 group-hover:w-3/4"
                    }`}
                  />
                </motion.button>
              ))}
              
              {/* Contact Button */}
              <motion.button
                onClick={() => handleNavClick("/contact")}
                className="ml-2 lg:ml-4 px-5 lg:px-7 py-2.5 lg:py-3 bg-foreground text-background text-sm lg:text-base font-semibold rounded-full hover:bg-accent-lime hover:text-foreground transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact →
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-12 h-12 flex items-center justify-center rounded-full bg-foreground text-background z-50 shadow-lg"
              whileTap={{ scale: 0.9 }}
              animate={{ rotate: isMenuOpen ? 90 : 0 }}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <motion.div
        className={`fixed inset-0 z-40 bg-background md:hidden ${
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 px-8">
          {navItems.map((item, index) => (
            <motion.button
              key={item.path}
              onClick={() => handleNavClick(item.path)}
              className={`text-4xl font-light transition-colors ${
                isActive(item.path) 
                  ? "text-accent-lime" 
                  : "text-foreground hover:text-accent-lime"
              }`}
              initial={{ opacity: 0, x: -50 }}
              animate={{
                opacity: isMenuOpen ? 1 : 0,
                x: isMenuOpen ? 0 : -50
              }}
              transition={{ duration: 0.4, delay: isMenuOpen ? index * 0.1 : 0 }}
            >
              {item.label}
            </motion.button>
          ))}
          
          <motion.button
            onClick={() => handleNavClick("/contact")}
            className="mt-8 px-10 py-4 bg-accent-lime text-foreground text-xl font-semibold rounded-full shadow-xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isMenuOpen ? 1 : 0,
              scale: isMenuOpen ? 1 : 0.8
            }}
            transition={{ duration: 0.4, delay: isMenuOpen ? 0.4 : 0 }}
          >
            Contact →
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};

export default Navigation;

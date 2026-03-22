import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Linkedin, MessageCircle, Github, Menu, X } from "lucide-react";

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/ajinkya-mhetre01", label: "LinkedIn", tooltip: "💬 Let's Connect & Chat!" },
  { icon: MessageCircle, href: "https://wa.me/919665248981?text=Hello,", label: "WhatsApp", tooltip: "Send a message" },
  { icon: Github, href: "https://github.com/ajinkya-m-01", label: "GitHub", tooltip: "View my work" },
];

const CircularMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="hidden lg:block fixed top-6 right-6 z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
     style={{ willChange: "transform, opacity" }}>
      {/* Main button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 rounded-full glass flex items-center justify-center transition-all duration-300 hover:scale-105"
        style={{ willChange: "transform, opacity", boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)", }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
             style={{ willChange: "transform, opacity" }}>
              <X className="w-5 h-5 text-foreground" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
             style={{ willChange: "transform, opacity" }}>
              <Menu className="w-5 h-5 text-foreground" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Social links */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-16 right-0 flex flex-col gap-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
           style={{ willChange: "transform, opacity" }}>
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full glass flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-foreground/10 transition-all duration-300 relative group"
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { delay: index * 0.1 }
                }}
                exit={{ 
                  opacity: 0, 
                  x: 20,
                  transition: { delay: (socialLinks.length - index - 1) * 0.05 }
                }}
                whileHover={{ scale: 1.1 }}
                style={{ willChange: "transform, opacity", boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)", }}
                aria-label={social.label}
                title={social.tooltip}
              >
                <social.icon className="w-5 h-5" strokeWidth={1.5} />
                {/* Tooltip */}
                <span className="absolute right-full mr-3 px-3 py-1.5 bg-foreground text-background text-xs whitespace-nowrap rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  {social.tooltip}
                </span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CircularMenu;

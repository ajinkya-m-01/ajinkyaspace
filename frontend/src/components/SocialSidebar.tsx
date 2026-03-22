import { motion } from "framer-motion";
import { Linkedin, MessageCircle, Github } from "lucide-react";
import MagneticButton from "./MagneticButton";
import SocialLinkPreview from "./SocialLinkPreview";

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/ajinkya-mhetre01", label: "LinkedIn", tooltip: "💬 Let's Connect & Chat!" },
  { icon: MessageCircle, href: "https://wa.me/919665248981?text=Hello,", label: "WhatsApp", tooltip: "Send me a message" },
  { icon: Github, href: "https://github.com/ajinkya-m-01", label: "GitHub", tooltip: "Check my code" },
];

const SocialSidebar = () => {
  return (
    <motion.div
      className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4 md:gap-6"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1.5 }}
     style={{ willChange: "transform, opacity" }}>
      {/* Vertical line */}
      <motion.div
        className="w-px h-16 bg-foreground/20 mx-auto mb-4"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
       style={{ willChange: "transform, opacity" }} />
      
      {socialLinks.map((social, index) => (
        <MagneticButton key={social.label} strength={0.5}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2 + index * 0.1 }}
           style={{ willChange: "transform, opacity" }}>
            <SocialLinkPreview
              href={social.href}
              label={social.label}
              position="right"
              className="block p-2 text-foreground/60 hover:text-foreground transition-colors duration-300 relative"
            >
              <social.icon className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.5} />
            </SocialLinkPreview>
          </motion.div>
        </MagneticButton>
      ))}
      
      {/* Vertical line */}
      <motion.div
        className="w-px h-16 bg-foreground/20 mx-auto mt-4"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, delay: 2.2 }}
       style={{ willChange: "transform, opacity" }} />
    </motion.div>
  );
};

export default SocialSidebar;

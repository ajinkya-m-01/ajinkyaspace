import { motion } from "framer-motion";
import { useState } from "react";
import PageTransition from "@/components/PageTransition";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CursorFollower from "@/components/CursorFollower";
import ScrollLine from "@/components/ScrollLine";

interface Service {
  name: string;
  category: string;
  tags: string[];
}

const services: Service[] = [
  // Web Development
  { name: "E-COMMERCE WEBSITES", category: "Web Development", tags: ["SHOPIFY", "WOO COMMERCE", "CUSTOM CART", "PAYMENT GATEWAYS"] },
  { name: "BUSINESS / COMPANY WEBSITES", category: "Web Development", tags: ["CORPORATE", "LANDING PAGES", "SEO OPTIMIZED", "RESPONSIVE"] },
  { name: "PORTFOLIO WEBSITES", category: "Web Development", tags: ["CREATIVE", "MINIMAL", "MODERN", "INTERACTIVE"] },
  { name: "CUSTOM WEB APPLICATIONS", category: "Web Development", tags: ["SAAS", "DASHBOARDS", "REAL-TIME", "SCALABLE"] },
  { name: "ADMIN PANELS & DASHBOARDS", category: "Web Development", tags: ["ANALYTICS", "REPORTS", "USER MANAGEMENT", "DATA VISUALIZATION"] },
  
  // Mobile App Development
  { name: "ANDROID APPS", category: "Mobile Development", tags: ["NATIVE", "PLAY STORE", "KOTLIN", "JAVA"] },
  { name: "IOS APPS", category: "Mobile Development", tags: ["SWIFT", "APP STORE", "OBJECTIVE-C", "NATIVE"] },
  { name: "CROSS-PLATFORM APPS (REACT NATIVE)", category: "Mobile Development", tags: ["REACT NATIVE", "IOS & ANDROID", "SINGLE CODEBASE", "FAST DEVELOPMENT"] },
  
  // Features & Integrations
  { name: "SECURE LOGIN / SIGNUP", category: "Features & Integrations", tags: ["JWT", "OAUTH", "2FA", "SECURITY"] },
  { name: "ROLE-BASED ACCESS", category: "Features & Integrations", tags: ["RBAC", "PERMISSIONS", "USER ROLES", "ACCESS CONTROL"] },
  { name: "ADMIN MANAGEMENT PANELS", category: "Features & Integrations", tags: ["CRUD", "ANALYTICS", "MONITORING", "CONTROLS"] },
  { name: "API INTEGRATIONS", category: "Features & Integrations", tags: ["REST API", "GRAPHQL", "THIRD-PARTY", "WEBHOOKS"] },
  { name: "CONTACT FORMS WITH EMAIL & WHATSAPP", category: "Features & Integrations", tags: ["NODEMAILER", "WHATSAPP API", "NOTIFICATIONS", "AUTO-REPLY"] },
];

interface ServiceItemProps {
  service: Service;
  index: number;
}

const ServiceItem = ({ service, index }: ServiceItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
     style={{ willChange: "transform, opacity" }}>
      <motion.div
        className="relative py-8 md:py-10 border-t border-foreground/10 group cursor-pointer overflow-hidden"
        whileHover={{ x: 10 }}
        transition={{ duration: 0.3 }}
       style={{ willChange: "transform, opacity" }}>
        {/* Service Name */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-foreground group-hover:text-accent-lime transition-colors duration-300 relative z-10">
          {service.name}
        </h2>

        {/* Vertical Strip (Patti) */}
        <motion.div
          className="absolute right-0 top-0 h-full w-1 bg-accent-lime overflow-hidden"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ 
            scaleY: isHovered ? 1 : 0,
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ willChange: "transform, opacity", originY: 0 }}
        />

        {/* Rotating Text Strip */}
        <motion.div
          className="absolute right-4 top-0 h-full w-32 md:w-40 overflow-hidden pointer-events-none"
          initial={{ opacity: 0, x: 20 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            x: isHovered ? 0 : 20
          }}
          transition={{ duration: 0.4 }}
         style={{ willChange: "transform, opacity" }}>
          <motion.div
            className="flex flex-col gap-4 py-4"
            animate={isHovered ? {
              y: [0, -400]
            } : {
              y: 0
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
           style={{ willChange: "transform, opacity" }}>
            {/* Duplicate tags for seamless loop */}
            {[...service.tags, ...service.tags, ...service.tags].map((tag, idx) => (
              <div
                key={idx}
                className="text-xs md:text-sm font-medium uppercase tracking-wider text-accent-lime whitespace-nowrap rotate-0 text-right"
              >
                {tag}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Services = () => {
  return (
    <PageTransition>
      <CursorFollower />
      <ScrollLine />
      <div className="noise-overlay" />
      <main className="relative cursor-none md:cursor-none bg-background min-h-screen">
        <Navigation />
        
        {/* Hero Section */}
        <section className="min-h-[50vh] flex items-center justify-center px-6 md:px-12 lg:px-20 xl:px-32 pt-32 pb-12 bg-background">
          <div className="w-full max-w-screen-2xl mx-auto">
            <motion.p
              className="text-xs md:text-sm uppercase tracking-wider text-accent-lime mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
             style={{ willChange: "transform, opacity" }}>
              What I Offer
            </motion.p>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-tight mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
             style={{ willChange: "transform, opacity" }}>
              Services
            </motion.h1>

            <motion.p
              className="text-base md:text-lg text-foreground/70 max-w-2xl mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
             style={{ willChange: "transform, opacity" }}>
              Professional web development, mobile apps, and custom solutions for your business.
              Available for freelancing and contract-based projects.
            </motion.p>
          </div>
        </section>

        {/* Services List */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-32 pb-20 bg-background">
          <div className="w-full max-w-screen-2xl mx-auto">
            {services.map((service, index) => (
              <ServiceItem key={service.name} service={service} index={index} />
            ))}
            
            {/* Final border */}
            <div className="border-t border-foreground/10 mt-0" />
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-32 py-20 md:py-32 bg-background text-center">
          <div className="w-full max-w-4xl mx-auto">
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
             style={{ willChange: "transform, opacity" }}>
              Ready to start your project?
            </motion.h2>
            
            <motion.p
              className="text-base md:text-lg text-foreground/70 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
             style={{ willChange: "transform, opacity" }}>
              Let's discuss your requirements and build something amazing together.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
             style={{ willChange: "transform, opacity" }}>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background text-base font-semibold hover:bg-accent-lime hover:text-foreground transition-all duration-300"
              >
                Get a Quote
              </a>
              
              <a
                href="mailto:ajinkyamehetre@email.com"
                className="inline-flex items-center justify-center px-8 py-4 border border-foreground/20 text-foreground text-base font-semibold hover:border-accent-lime hover:text-accent-lime transition-all duration-300"
              >
                Email Me
              </a>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
};

export default Services;

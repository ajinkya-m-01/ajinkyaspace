import { motion } from "framer-motion";
import { useState, FormEvent, useEffect } from "react";
import { Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import PageTransition from "@/components/PageTransition";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CursorFollower from "@/components/CursorFollower";
import ScrollLine from "@/components/ScrollLine";

interface FormData {
  fullName: string;
  email: string;
  enquiryType: string;
  message: string;
  projectType?: string;
  budgetRange?: string;
  expectedTimeline?: string;
}

const SERVICE_ID  = "service_ss9zalj";
const TEMPLATE_ID = "template_c8zm9sd";
const PUBLIC_KEY  = "HjAofPMvkMzHBHnrH";

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    enquiryType: "General Enquiry",
    message: "",
    projectType: "",
    budgetRange: "",
    expectedTimeline: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  useEffect(() => {
    emailjs.init(PUBLIC_KEY);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: formData.fullName,
          fullName: formData.fullName,
          email: formData.email,
          enquiryType: formData.enquiryType,
          message: formData.message,
          projectType: formData.projectType || "N/A",
          budgetRange: formData.budgetRange || "N/A",
          expectedTimeline: formData.expectedTimeline || "N/A",
        },
        {
          publicKey: PUBLIC_KEY,
        }
      );

      setSubmitStatus({
        type: "success",
        message: "Thank you! Your message has been sent successfully. I'll get back to you soon."
      });
      setFormData({
        fullName: "",
        email: "",
        enquiryType: "General Enquiry",
        message: "",
        projectType: "",
        budgetRange: "",
        expectedTimeline: ""
      });
    } catch {
      setSubmitStatus({
        type: "error",
        message: "Failed to send message. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFreelanceProject = formData.enquiryType === "Freelance Project";

  return (
    <PageTransition>
      <CursorFollower />
      <ScrollLine />
      <div className="noise-overlay" />
      <main className="relative cursor-none md:cursor-none">
        <Navigation />
        
        {/* Hero Section */}
        <section className="min-h-[50vh] flex items-center justify-center px-6 md:px-12 lg:px-20 xl:px-32 pt-32 pb-12 bg-background">
          <div className="w-full max-w-screen-xl mx-auto text-center">
            <motion.p
              className="text-xs md:text-sm uppercase tracking-wider text-accent-lime mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
             style={{ willChange: "transform, opacity" }}>
              Get in Touch
            </motion.p>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
             style={{ willChange: "transform, opacity" }}>
              Let's Work Together
            </motion.h1>

            <motion.p
              className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
             style={{ willChange: "transform, opacity" }}>
              Have a project in mind or just want to say hello? Fill out the form below and I'll get back to you as soon as possible.
            </motion.p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-12 md:py-20 px-6 md:px-12 lg:px-20 xl:px-32 bg-background">
          <div className="w-full max-w-3xl mx-auto">
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
             style={{ willChange: "transform, opacity" }}>
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-foreground/80 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-foreground/5 border border-foreground/20 text-foreground focus:border-accent-lime focus:outline-none focus:ring-1 focus:ring-accent-lime transition-colors"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-foreground/5 border border-foreground/20 text-foreground focus:border-accent-lime focus:outline-none focus:ring-1 focus:ring-accent-lime transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              {/* Enquiry Type */}
              <div>
                <label htmlFor="enquiryType" className="block text-sm font-medium text-foreground/80 mb-2">
                  Enquiry Type *
                </label>
                <select
                  id="enquiryType"
                  name="enquiryType"
                  value={formData.enquiryType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-foreground/5 border border-foreground/20 text-foreground focus:border-accent-lime focus:outline-none focus:ring-1 focus:ring-accent-lime transition-colors cursor-pointer"
                >
                  <option value="General Enquiry">General Enquiry</option>
                  <option value="Freelance Project">Freelance Project</option>
                  <option value="Collaboration">Collaboration</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Conditional Fields for Freelance Project */}
              {isFreelanceProject && (
                <motion.div
                  className="space-y-6 p-6 bg-accent-lime/5 border border-accent-lime/20 rounded-lg"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                 style={{ willChange: "transform, opacity" }}>
                  <h3 className="text-lg font-medium text-foreground mb-4">Project Details</h3>

                  {/* Project Type */}
                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium text-foreground/80 mb-2">
                      Project Type *
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      required={isFreelanceProject}
                      className="w-full px-4 py-3 bg-background border border-foreground/20 text-foreground focus:border-accent-lime focus:outline-none focus:ring-1 focus:ring-accent-lime transition-colors cursor-pointer"
                    >
                      <option value="">Select project type</option>
                      <option value="Website">Website</option>
                      <option value="App">App</option>
                      <option value="Backend">Backend</option>
                      <option value="Full-stack">Full-stack</option>
                    </select>
                  </div>

                  {/* Budget Range */}
                  <div>
                    <label htmlFor="budgetRange" className="block text-sm font-medium text-foreground/80 mb-2">
                      Budget Range *
                    </label>
                    <select
                      id="budgetRange"
                      name="budgetRange"
                      value={formData.budgetRange}
                      onChange={handleInputChange}
                      required={isFreelanceProject}
                      className="w-full px-4 py-3 bg-background border border-foreground/20 text-foreground focus:border-accent-lime focus:outline-none focus:ring-1 focus:ring-accent-lime transition-colors cursor-pointer"
                    >
                      <option value="">Select budget range</option>
                      <option value="Under ₹10,000">Under ₹10,000</option>
                      <option value="₹10,000 - ₹50,000">₹10,000 - ₹50,000</option>
                      <option value="₹50,000 - ₹2,00,000">₹50,000 - ₹2,00,000</option>
                      <option value="₹2,00,000+">₹2,00,000+</option>
                      <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                      <option value="$5,000+">$5,000+</option>
                    </select>
                  </div>

                  {/* Expected Timeline */}
                  <div>
                    <label htmlFor="expectedTimeline" className="block text-sm font-medium text-foreground/80 mb-2">
                      Expected Timeline *
                    </label>
                    <select
                      id="expectedTimeline"
                      name="expectedTimeline"
                      value={formData.expectedTimeline}
                      onChange={handleInputChange}
                      required={isFreelanceProject}
                      className="w-full px-4 py-3 bg-background border border-foreground/20 text-foreground focus:border-accent-lime focus:outline-none focus:ring-1 focus:ring-accent-lime transition-colors cursor-pointer"
                    >
                      <option value="">Select timeline</option>
                      <option value="ASAP">ASAP (Less than 1 month)</option>
                      <option value="1-3 months">1-3 months</option>
                      <option value="3-6 months">3-6 months</option>
                      <option value="6+ months">6+ months</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>
                </motion.div>
              )}

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground/80 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-foreground/5 border border-foreground/20 text-foreground focus:border-accent-lime focus:outline-none focus:ring-1 focus:ring-accent-lime transition-colors resize-none"
                  placeholder="Tell me about your project or enquiry..."
                />
              </div>

              {/* Submit Status Messages */}
              {submitStatus.type && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg ${
                    submitStatus.type === "success"
                      ? "bg-green-500/10 border border-green-500/30 text-green-500"
                      : "bg-red-500/10 border border-red-500/30 text-red-500"
                  }`}
                 style={{ willChange: "transform, opacity" }}>
                  {submitStatus.message}
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-foreground text-background font-semibold text-lg rounded-full hover:bg-accent-lime hover:text-foreground transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
               style={{ willChange: "transform, opacity" }}>
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                     style={{ willChange: "transform, opacity" }} />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </motion.form>
          </div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
};
export default Contact;
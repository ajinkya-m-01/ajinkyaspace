import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import PageTransition from "@/components/PageTransition";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CursorFollower from "@/components/CursorFollower";
import ScrollLine from "@/components/ScrollLine";
import portraitImage from "@/assets/about-photo.png";

const About = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(163,230,53,${p.opacity})`;
        ctx.fill();
      });
      // Draw lines between close particles
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(163,230,53,${0.08 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  const orb1X = useTransform(mouseX, [0, window.innerWidth], [-20, 20]);
  const orb1Y = useTransform(mouseY, [0, window.innerHeight], [-20, 20]);
  const orb2X = useTransform(mouseX, [0, window.innerWidth], [20, -20]);
  const orb2Y = useTransform(mouseY, [0, window.innerHeight], [20, -20]);

  return (
    <PageTransition>
      <CursorFollower />
      <ScrollLine />
      <main className="relative">
        <Navigation />

        {/* ── HERO ── */}
        <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
          {/* Full page background photo */}
          <div className="absolute inset-0 z-0">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[700px] bg-accent-lime/8 blur-[100px] pointer-events-none z-10" />
            <img src={portraitImage} alt="" className="h-full object-cover opacity-95" style={{width: "55%", marginLeft: "auto", objectPosition: "50% 5%", minWidth: "300px"}} />
            <div className="absolute inset-0" style={{background: "linear-gradient(90deg, rgba(10,10,10,0.98) 0%, rgba(10,10,10,0.95) 50%, rgba(10,10,10,0.5) 75%, rgba(10,10,10,0.1) 100%)"}} />
            <div className="absolute inset-0" style={{background: "linear-gradient(to top, rgba(10,10,10,0.9) 0%, transparent 50%)"}} />
          </div>



          {/* Animated orbs */}
          <motion.div style={{ x: orb1X, y: orb1Y }} className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-accent-lime/8 blur-[120px] pointer-events-none" />
          <motion.div style={{ x: orb2X, y: orb2Y }} className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/6 blur-[100px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent-lime/3 blur-[180px] pointer-events-none" />

          <div className="relative w-full min-h-screen flex items-center z-10">

            {/* LEFT */}
            <motion.div className="flex flex-col justify-center space-y-6 md:space-y-8 px-6 md:px-16 lg:px-20 xl:px-24 pt-28 pb-16 max-w-2xl w-full"
              initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }}>

              {/* Eyebrow with animated line */}
              <motion.div className="flex items-center gap-3"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                <motion.div className="h-px bg-accent-lime" initial={{ width: 0 }} animate={{ width: 32 }} transition={{ duration: 0.8, delay: 0.5 }} />
                <p className="text-xs uppercase tracking-[0.3em] text-accent-lime">Get to know me</p>
              </motion.div>

              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-none"
                initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }}>
                About
                <span className="block text-accent-lime italic">Me.</span>
              </motion.h1>

              <motion.div className="space-y-4 text-base md:text-lg text-foreground/70 leading-relaxed max-w-lg"
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}>
                <p>I'm <span className="text-foreground font-medium">Ajinkya</span> — a Full Stack Developer crafting fast, scalable, and immersive digital experiences that merge creativity with engineering precision.</p>
                <p>I specialize in web apps, AI-driven products, and interactive experiences using <span className="text-accent-lime/90">React, Node.js, and modern frameworks.</span></p>
                <p>Passionate about clean code and user-centric design — I bring ideas to life through thoughtful architecture.</p>
              </motion.div>

              {/* Stats row */}
              <motion.div className="flex gap-8 pt-2"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.7 }}>
                {[["50+", "Projects"], ["2+", "Yrs Exp"], ["15+", "Clients"]].map(([num, label]) => (
                  <div key={label}>
                    <div className="text-2xl md:text-3xl font-light text-accent-lime">{num}</div>
                    <div className="text-xs uppercase tracking-wider text-foreground/40 mt-1">{label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

          </div>
        </section>

        {/* ── SKILLS ── */}
        <section className="relative py-24 px-6 md:px-12 lg:px-20 xl:px-32 bg-background overflow-hidden">
          {/* Section bg accent */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(163,230,53,0.05) 0%, transparent 70%)" }} />

          <div className="relative w-full max-w-screen-2xl mx-auto">
            <motion.div className="flex items-end justify-between mb-16"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light">What I <span className="text-accent-lime italic">Do</span></h2>
              <p className="text-sm text-foreground/30 uppercase tracking-widest hidden md:block">6 Disciplines</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "Full-Stack Development", desc: "React, Node.js, Express, MongoDB, PHP/Laravel", icon: "⚡", tags: ["MERN", "REST API", "TypeScript"] },
                { title: "UI/UX Design", desc: "Pixel-perfect interfaces, component systems, Figma to code", icon: "✦", tags: ["Figma", "Tailwind", "Framer"] },
                { title: "E-commerce", desc: "WooCommerce, Shopify, custom carts, payment gateways", icon: "◈", tags: ["WooCommerce", "Shopify", "Razorpay"] },
                { title: "Mobile Apps", desc: "Cross-platform iOS & Android with React Native", icon: "▣", tags: ["React Native", "Expo", "Play Store"] },
                { title: "API Development", desc: "RESTful APIs, third-party integrations, webhooks", icon: "⬡", tags: ["Node.js", "Express", "MongoDB"] },
                { title: "DevOps & Deployment", desc: "VPS, Nginx, PM2, SSL, CI/CD pipelines", icon: "◎", tags: ["Vultr", "Nginx", "PM2"] },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="group relative p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-accent-lime/40 hover:bg-accent-lime/[0.04] transition-all duration-500 overflow-hidden cursor-default"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}>
                  <span className="absolute bottom-3 right-4 text-6xl font-bold text-white/[0.03] group-hover:text-accent-lime/8 transition-colors duration-500 select-none leading-none">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="text-2xl text-accent-lime mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                  <h3 className="text-base md:text-lg font-medium text-white mb-2 group-hover:text-accent-lime transition-colors duration-300">{item.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed mb-4 group-hover:text-white/70 transition-colors duration-300">{item.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border border-white/10 text-white/40 group-hover:border-accent-lime/30 group-hover:text-accent-lime/70 transition-all duration-300">{tag}</span>
                    ))}
                  </div>
                  <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-accent-lime/60 to-transparent group-hover:w-full transition-all duration-500" />
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
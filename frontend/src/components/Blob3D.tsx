import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const Blob3D = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  
  const smoothRotate = useSpring(rotate, { stiffness: 30, damping: 30 });
  const smoothScale = useSpring(scale, { stiffness: 50, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMousePosition({ x: x * 20, y: y * 20 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const smoothX = useSpring(mousePosition.x, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mousePosition.y, { stiffness: 50, damping: 20 });

  return (
    <motion.div
      ref={ref}
      className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
      style={{
        rotateX: smoothY,
        rotateY: smoothX,
        rotate: smoothRotate,
        scale: smoothScale,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Iridescent blob effect using CSS */}
      <div className="absolute inset-0 rounded-full bg-gradient-conic from-pink-300 via-purple-300 to-cyan-300 opacity-80 blur-sm animate-spin-slow" 
        style={{ animationDuration: "20s" }}
      />
      <div className="absolute inset-2 rounded-full bg-gradient-conic from-yellow-200 via-pink-200 to-blue-200 opacity-90 blur-xs"
        style={{ animationDuration: "15s", animationDirection: "reverse" }}
      />
      <div className="absolute inset-4 rounded-full bg-gradient-radial from-white/80 via-transparent to-transparent" />
      
      {/* Glass overlay */}
      <div className="absolute inset-0 rounded-full backdrop-blur-sm bg-white/10" 
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.3) 100%)",
          boxShadow: "inset 0 0 60px rgba(255,255,255,0.5), 0 20px 60px rgba(0,0,0,0.1)"
        }}
      />
    </motion.div>
  );
};

export default Blob3D;

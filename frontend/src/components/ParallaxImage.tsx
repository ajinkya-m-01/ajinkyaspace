import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useState } from "react";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  parallaxIntensity?: number;
  enableTilt?: boolean;
}

const ParallaxImage = ({ 
  src, 
  alt, 
  className = "", 
  parallaxIntensity = 0.1,
  enableTilt = true 
}: ParallaxImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Parallax Y movement
  const y = useTransform(scrollYProgress, [0, 1], [-50 * parallaxIntensity, 50 * parallaxIntensity]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);
  
  // Smooth spring for parallax
  const smoothY = useSpring(y, { stiffness: 100, damping: 30, mass: 0.5 });
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30, mass: 0.5 });
  
  // 3D tilt effect on hover
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  
  const smoothRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt || !ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Subtle rotation (max 3 degrees)
    rotateY.set((mouseX / rect.width) * 6);
    rotateX.set(-(mouseY / rect.height) * 6);
  };
  
  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          y: smoothY,
          scale: smoothScale,
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full"
      >
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-full object-cover grayscale"
          animate={{
            filter: isHovered 
              ? "grayscale(100%) contrast(1.15) brightness(1.05)" 
              : "grayscale(100%) contrast(1.1)",
          }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
      
      {/* Subtle depth shadow on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          boxShadow: isHovered 
            ? "inset 0 0 60px rgba(0,0,0,0.15)" 
            : "inset 0 0 0px rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
};

export default ParallaxImage;

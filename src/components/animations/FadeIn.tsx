import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, direction = 'up' }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const directionOffset = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0,
        ...directionOffset[direction],
      }}
      animate={{
        opacity: inView ? 1 : 0,
        x: inView ? 0 : directionOffset[direction].x,
        y: inView ? 0 : directionOffset[direction].y,
      }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.21, 0.45, 0.27, 0.99],
      }}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
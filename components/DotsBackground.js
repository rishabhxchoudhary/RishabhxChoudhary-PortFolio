// components/DotsBackground.js
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const COLORS = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#FF6FCF']; // Customize your colors

const getRandom = (min, max) => Math.random() * (max - min) + min;

const DotsBackground = ({ numberOfDots }) => {
  const [dots, setDots] = useState([]);

  useEffect(() => {
    const generatedDots = Array.from({ length: numberOfDots }).map(() => ({
      id: Math.random().toString(36).substr(2, 9),
      size: getRandom(4, 12), // size in px
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      initialX: getRandom(0, 100), // percentage
      initialY: getRandom(0, 100), // percentage
      duration: getRandom(5, 15), // animation duration in seconds
      delay: getRandom(0, 10), // animation delay in seconds
      direction: Math.random() > 0.5 ? 1 : -1, // direction of movement
    }));
    setDots(generatedDots);
  }, [numberOfDots]);

  return (
    <motion.div
      className="absolute inset-0 z-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full"
          style={{
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            backgroundColor: dot.color,
            top: `${dot.initialY}%`,
            left: `${dot.initialX}%`,
          }}
          animate={{
            y: [0, dot.direction * getRandom(20, 50), 0],
            x: [0, dot.direction * getRandom(20, 50), 0],
            opacity: [0.8, 0.5, 0.8],
          }}
          transition={{
            duration: dot.duration,
            delay: dot.delay,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
        />
      ))}
    </motion.div>
  );
};

export default DotsBackground;

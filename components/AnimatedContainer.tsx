import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnimatedContainerProps {
  children: ReactNode;
  delay: number;
  styles?: string;
}

const AnimatedContainer = ({ children, delay, styles }: AnimatedContainerProps) => {
  const variants = {
    hidden: {
      opacity: 0,
      x: 50,
      y: 100,
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: 'tween',
        ease: 'easeIn',
        duration: 0.5,
        delay: delay,
      },
    },
  };

  return (
    <motion.div
      className={styles}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedContainer;
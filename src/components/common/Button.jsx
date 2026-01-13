import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, className = '' }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`bg-primary-maroon text-white font-bold py-2 px-4 rounded ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default Button;

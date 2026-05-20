"use client";

import { motion } from "framer-motion";

export default function AnimatedBrand({ text }) {
  const letters = text.split("");

  return (
    <h1 className="text-2xl md:text-4xl font-extrabold tracking-[0.22em] bg-gradient-to-r from-[#9ad94f] via-[#5ffbf1] to-[#167c8a] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(95,251,241,0.25)] flex">
      {letters.map((char, i) => {
        const xValues = [-20, 15, -10, 18, -12, 10];
        const yValues = [10, -8, 6, -12, 5, -6];
        const rotateValues = [-20, 15, -10, 18, -8, 10];

        return (
          <motion.span
            key={i}
            className="inline-block"
            initial={{
              opacity: 0,
              x: xValues[i % xValues.length],
              y: yValues[i % yValues.length],
              scale: 0.6,
              rotate: rotateValues[i % rotateValues.length],
            }}
            animate={{
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              rotate: 0,
            }}
            transition={{
              duration: 0.9,
              delay: i * 0.035,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </h1>
  );
}
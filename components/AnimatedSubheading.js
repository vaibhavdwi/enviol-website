"use client";

import { motion } from "framer-motion";

export default function AnimatedSubheading({ text }) {
  const letters = text.split("");

  return (
    <p className="text-[11px] md:text-base font-semibold tracking-[0.26em] text-[#2ea7b8] mt-1 flex flex-wrap">
      {letters.map((char, i) => {
        const xValues = [-30, 25, -20, 35, -15, 20];
        const yValues = [15, -12, 10, -18, 8, -10];
        const rotateValues = [-45, 30, -25, 40, -15, 20];

        return (
          <motion.span
            key={i}
            className="inline-block"
            initial={{
              opacity: 0,
              x: xValues[i % xValues.length],
              y: yValues[i % yValues.length],
              scale: 0,
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
              duration: 1.6,
              delay: 0.9 + i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        );
      })}
    </p>
  );
}
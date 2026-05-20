"use client";

import { motion } from "framer-motion";

export default function AnimatedTagline({ text }) {
  const letters = text.split("");

  return (
    <p className="text-[11px] md:text-sm italic tracking-[0.16em] text-[#b6ff7a] leading-none whitespace-nowrap overflow-hidden font-semibold">
      {letters.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 2.8,
            times: [0, 0.15, 0.7, 1],
            delay: 2.4 + i * 0.08,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </p>
  );
}
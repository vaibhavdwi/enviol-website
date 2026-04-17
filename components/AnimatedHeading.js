"use client";

import { motion } from "framer-motion";

export default function AnimatedHeading({ title }) {
  const letters = title.split("");

  return (
    <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
      {letters.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: i * 0.035,     // ⬅️ controls speed
            duration: 0.4,
            ease: "easeOut"
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </h1>
  );
}
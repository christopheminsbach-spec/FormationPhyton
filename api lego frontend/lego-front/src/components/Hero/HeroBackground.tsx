import { motion } from "framer-motion";

export default function HeroBackground() {
  return (
    <>
      <motion.div
        animate={{
          y: [0, -30, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
        }}
        className="absolute right-20 top-32 h-40 w-40 rounded-full bg-yellow-300 opacity-30 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, 30, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
        }}
        className="absolute bottom-20 left-20 h-72 w-72 rounded-full bg-red-500 opacity-30 blur-3xl"
      />
    </>
  );
}
"use client";

import { motion, Variants } from "framer-motion";

interface BentoGridProps {
  children: React.ReactNode;
}

export default function BentoGrid({ children }: BentoGridProps) {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[auto]"
    >
      {children}
    </motion.section>
  );
}

interface BentoItemProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function BentoItem({ children, className = "", style }: BentoItemProps) {
  const item: Variants = {
    hidden: { y: 24, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <motion.article
      variants={item}
      whileHover={{
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      style={style}
      className={`glass rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between group glass-hover ${className}`}
    >
      {children}
    </motion.article>
  );
}


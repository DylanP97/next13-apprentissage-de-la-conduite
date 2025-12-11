"use client";
import { motion } from "framer-motion";

const QuizProgress = ({ progress }: { progress: number }) => (
  <div className="h-2 bg-gray-300 dark:bg-gray-800">
    <motion.div
      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
    />
  </div>
);

export default QuizProgress;

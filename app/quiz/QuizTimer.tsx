"use client";
import { motion } from "framer-motion";

const QuizTimer = ({ timeLeft, isDarkMode }: { timeLeft: number; isDarkMode: boolean }) => (
  <>
    <div className="h-2 bg-gray-200 dark:bg-gray-700">
      <motion.div
        className="h-full bg-red-500"
        animate={{ width: `${(timeLeft / 30) * 100}%` }}
        transition={{ duration: 1, ease: "linear" }}
      />
    </div>
    <p
      className={`text-center text-xs mt-1 ${
        timeLeft <= 10 ? "text-red-500" : isDarkMode ? "text-gray-300" : "text-gray-700"
      }`}
    >
      ⏳ {timeLeft}s restantes
    </p>
  </>
);

export default QuizTimer;

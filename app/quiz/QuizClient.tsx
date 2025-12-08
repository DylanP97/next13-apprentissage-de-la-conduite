// QuizClient.tsx – Version 100 % lisible + ultra compacte
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTheme } from "../providers/ThemeProvider";

interface Question {
  question: string;
  answers: string[];
  correctAnswer: number;
  imageUrl?: string;
}

const QuizClient: React.FC<{ publishedQuestions: Question[] }> = ({ publishedQuestions }) => {
  const { isDarkMode } = useTheme();

  const [quizStarted, setQuizStarted] = useState(false);
  const [seeResults, setSeeResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [availableQuestions, setAvailableQuestions] = useState(publishedQuestions);
  const [questionHistory, setQuestionHistory] = useState<any[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const progress = publishedQuestions.length
    ? ((publishedQuestions.length - availableQuestions.length) / publishedQuestions.length) * 100
    : 0;

  const pickRandomQuestion = () => {
    if (availableQuestions.length === 0) {
      setSeeResults(true);
      return;
    }
    const idx = Math.floor(Math.random() * availableQuestions.length);
    const q = availableQuestions[idx];
    setCurrentQuestion(q);
    setAvailableQuestions(prev => prev.filter((_, i) => i !== idx));
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    const correct = index === currentQuestion!.correctAnswer;
    setQuestionHistory(prev => [...prev, { ...currentQuestion, userAnswer: index, isCorrect: correct }]);
  };

  const score = questionHistory.filter(q => q.isCorrect).length;
  const total = questionHistory.length;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-2 py-2 md:py-6"
         style={{ background: isDarkMode ? "#0f172a" : "#f9fafb" }}>
      
      <div className="w-full max-w-xl">
        <AnimatePresence mode="wait">
          {!quizStarted ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center w-full">
              <h1 className={`text-2xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Quiz Conduite
              </h1>
              <button
                onClick={() => { setQuizStarted(true); pickRandomQuestion(); }}
                className="w-full py-4 text-white font-bold text-lg rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600"
              >
                Démarrer
              </button>
            </motion.div>
          ) : !seeResults ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`rounded-3xl shadow-2xl overflow-hidden md:border ${
                isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
              }`}
            >
              {/* Progress */}
              <div className="h-2 bg-gray-300 dark:bg-gray-800">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>

              <div className="p-2">
                {/* Image */}
                {currentQuestion?.imageUrl && (
                  <div className="mb-2 md:mb-4 -mx-4">
                    <Image
                      src={currentQuestion.imageUrl}
                      alt=""
                      width={800}
                      height={400}
                      className="w-full h-auto max-h-40 object-cover rounded-t-2xl"
                      priority
                    />
                  </div>
                )}

                {/* Question */}
                <h2 className={`text-md md:text-lg font-bold text-center mb-2 leading-tight ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>
                  {currentQuestion?.question}
                </h2>

                {/* Réponses – TEXTE TOUJOURS LISBLE */}
                <div className="space-y-3 mb-4">
                  {currentQuestion?.answers.map((answer, i) => {
                    const isSelected = selectedAnswer === i;
                    const isCorrect = i === currentQuestion.correctAnswer;

                    return (
                      <button
                        key={i}
                        onClick={() => handleAnswer(i)}
                        disabled={showResult}
                        className={`
                          w-full px-5 py-3 rounded-2xl text-left font-medium transition-all
                          ${showResult && isCorrect
                            ? "bg-emerald-600 text-white"
                            : showResult && isSelected && !isCorrect
                            ? "bg-red-600 text-white"
                            : isSelected
                            ? "bg-indigo-600 text-white"
                            : isDarkMode
                            ? "bg-gray-800 text-white hover:bg-gray-700"
                            : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                          }
                          ${showResult ? "" : "active:scale-98"}
                        `}
                      >
                        <div className="flex justify-between items-center">
                          <span className="truncate pr-3 text-xs md:text-sm">{answer}</span>
                          {showResult && isCorrect && <span className="font-bold  text-xs md:text-sm">Correct</span>}
                          {showResult && isSelected && !isCorrect && <span className="font-bold  text-xs md:text-sm">Incorrect</span>}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Score + Bouton */}
                <div className="text-center space-y-3">
                  <p className={` text-xs md:text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    <span className="font-bold text-indigo-500">Score : {score}/{total}</span>
                    {" • "}
                    <span>{availableQuestions.length} restante{availableQuestions.length > 1 ? "s" : ""}</span>
                  </p>

                  {showResult && (
                    <button
                      onClick={() => pickRandomQuestion()}
                      className="w-full py-3.5 text-white font-bold rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600  text-xs md:text-sm"
                    >
                      {availableQuestions.length <= 1 ? "Voir les résultats" : "Question suivante"}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`rounded-3xl p-8 text-center ${
                isDarkMode ? "bg-gray-900" : "bg-white"
              } border ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}
            >
              <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Quiz terminé !
              </h2>
              <p className={`text-5xl font-black ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                {score} / {publishedQuestions.length}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-8 w-full py-4 text-white font-bold rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600"
              >
                Recommencer
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuizClient;
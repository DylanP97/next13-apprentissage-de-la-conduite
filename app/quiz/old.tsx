"use client";

import { useState, useEffect, useRef } from "react";
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
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [availableQuestions, setAvailableQuestions] = useState<Question[]>([]);
  const [questionHistory, setQuestionHistory] = useState<any[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // TIMER
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerRunning, setTimerRunning] = useState(false);

  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  const progress = quizQuestions.length
    ? ((quizQuestions.length - availableQuestions.length) / quizQuestions.length) * 100
    : 0;

  const selectRandomQuestions = (questions: Question[], limit: number = 15) => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(limit, questions.length));
  };

  // ---------- TTS ----------
  const speak = (text: string) => {
    if (!ttsEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fr-FR";
    utterance.rate = 0.9;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    if (typeof window !== "undefined") {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
    }
  };

  useEffect(() => {
    return () => stopSpeech();
  }, []);

  // Lire la question
  useEffect(() => {
    if (!currentQuestion || !ttsEnabled || showResult) return;

    const timer = setTimeout(() => {
      const answers = currentQuestion.answers
        .map((ans, i) => `Réponse ${String.fromCharCode(65 + i)}: ${ans}`)
        .join(". ");

      speak(`${currentQuestion.question}. ${answers}`);
    }, 300);

    return () => clearTimeout(timer);
  }, [currentQuestion, ttsEnabled, showResult]);

  // ---------- TIMER ----------
  useEffect(() => {
    if (!currentQuestion) return;

    setTimeLeft(30);
    setTimerRunning(true);

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimerRunning(false);
          stopSpeech();
          handleAnswer(-1);   // temps écoulé → incorrect
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentQuestion]);

  const startQuiz = () => {
    const selected = selectRandomQuestions(publishedQuestions, 15);
    setQuizQuestions(selected);
    setAvailableQuestions(selected);
    setQuizStarted(true);
    pickRandomQuestion(selected);
  };

  const pickRandomQuestion = (questions?: Question[]) => {
    stopSpeech();
    const qList = questions || availableQuestions;

    if (qList.length === 0) {
      setSeeResults(true);
      return;
    }

    const idx = Math.floor(Math.random() * qList.length);
    const q = qList[idx];

    setCurrentQuestion(q);
    setAvailableQuestions(prev => prev.filter((_, i) => i !== idx));
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAnswer = (index: number) => {
    if (showResult) return;

    stopSpeech();
    setTimerRunning(false);

    setSelectedAnswer(index);
    setShowResult(true);

    const correct =
      index !== -1 && index === currentQuestion!.correctAnswer;

    setQuestionHistory(prev => [
      ...prev,
      { ...currentQuestion, userAnswer: index, isCorrect: correct }
    ]);

    if (ttsEnabled) {
      setTimeout(() => {
        speak(correct ? "Correct !" : "Incorrect !");
      }, 200);
    }

    // Passage automatique
    setTimeout(() => {
      pickRandomQuestion();
    }, 900);
  };

  const resetQuiz = () => {
    stopSpeech();
    setQuizStarted(false);
    setSeeResults(false);
    setCurrentQuestion(null);
    setQuizQuestions([]);
    setAvailableQuestions([]);
    setQuestionHistory([]);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const score = questionHistory.filter((q) => q.isCorrect).length;
  const total = questionHistory.length;

  return (
    <div
      className="flex flex-col items-center px-2 py-2 md:py-6"
      style={{ background: isDarkMode ? "#000014" : "#f9fafb" }}
    >
      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {!quizStarted ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
              <h1 className={`text-2xl font-bold my-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Quiz Code & Conduite Connaissances Générales
              </h1>

              <p className={`italic text-sm my-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Testez vos connaissances grâce à ce quiz
              </p>

              <p className="text-xs text-gray-500">15 questions aléatoires</p>

              <button
                onClick={startQuiz}
                className="w-full mt-6 py-4 text-white font-bold text-lg rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600"
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
              {/* Progression globale */}
              <div className="h-2 bg-gray-300 dark:bg-gray-800">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>

              {/* TIMER BAR */}
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

              <div className="p-2">
                {/* Boutons audio */}
                <div className="flex justify-between gap-2 mb-2">
                  <button
                    onClick={resetQuiz}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium ${
                      isDarkMode ? "bg-red-900 text-white" : "bg-red-100 text-red-900"
                    }`}
                  >
                    ✕ Quitter
                  </button>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        if (currentQuestion) {
                          const answers = currentQuestion.answers
                            .map((ans, i) => `Réponse ${String.fromCharCode(65 + i)}: ${ans}`)
                            .join(". ");
                          speak(`${currentQuestion.question}. ${answers}`);
                        }
                      }}
                      disabled={isSpeaking}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium ${
                        isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      🔊 Réécouter
                    </button>

                    <button
                      onClick={() => {
                        if (ttsEnabled) stopSpeech();
                        setTtsEnabled(!ttsEnabled);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium ${
                        ttsEnabled ? "bg-indigo-600 text-white" : isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100"
                      }`}
                    >
                      {ttsEnabled ? "🔊 ON" : "🔇 OFF"}
                    </button>
                  </div>
                </div>

                {/* Image */}
                {currentQuestion?.imageUrl && (
                  <div className="-mx-4">
                    <Image
                      src={currentQuestion.imageUrl}
                      alt=""
                      width={800}
                      height={500}
                      className="w-full h-44 md:h-60 object-cover rounded-t-2xl"
                    />
                  </div>
                )}

                {/* Question */}
                <h2
                  className={`text-sm md:text-lg font-bold text-center my-1 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {currentQuestion?.question}
                </h2>

                {/* Réponses */}
                <div className="space-y-3 mb-4">
                  {currentQuestion?.answers.map((answer, i) => {
                    const isSelected = selectedAnswer === i;
                    const isCorrect = i === currentQuestion.correctAnswer;

                    return (
                      <button
                        key={i}
                        onClick={() => handleAnswer(i)}
                        disabled={showResult}
                        className={`w-full px-4 py-2 rounded-2xl font-medium text-left transition-all
                          ${
                            showResult && isCorrect
                              ? "bg-emerald-600 text-white"
                              : showResult && isSelected && !isCorrect
                              ? "bg-red-600 text-white"
                              : isSelected
                              ? "bg-indigo-600 text-white"
                              : isDarkMode
                              ? "bg-gray-800 text-white hover:bg-gray-700"
                              : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                          }
                        `}
                      >
                        <span className="text-xs md:text-sm">
                          <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span>
                          {answer}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Score */}
                <p className={`text-xs text-center ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Score : {score}/{total} • {availableQuestions.length} restantes
                </p>
              </div>
            </motion.div>
          ) : (
            // ----------------------- RESULTATS -----------------------
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`rounded-3xl p-8 text-center border ${
                isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
              }`}
            >
              <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Quiz terminé !
              </h2>

              <p className={`text-5xl font-black mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                {score} / {quizQuestions.length}
              </p>

              <button
                onClick={resetQuiz}
                className="mt-6 w-full py-4 text-white font-bold rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600"
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

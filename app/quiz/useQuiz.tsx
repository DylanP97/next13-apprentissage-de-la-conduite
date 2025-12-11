"use client";

import { useState, useEffect, useRef } from "react";

export interface Question {
  question: string;
  answers: string[];
  correctAnswer: number;
  imageUrl?: string;
}

export function useQuiz(publishedQuestions: Question[], limit = 15) {
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

  const [timeLeft, setTimeLeft] = useState(30);
  const [timerRunning, setTimerRunning] = useState(false);

  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  const progress = quizQuestions.length
    ? ((quizQuestions.length - availableQuestions.length) / quizQuestions.length) * 100
    : 0;

  const selectRandomQuestions = (questions: Question[], limit: number) => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(limit, questions.length));
  };

  // ---------- TTS ----------
  const speak = (text: string) => {
    if (!ttsEnabled || typeof window === "undefined" || !window.speechSynthesis) return;

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
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  useEffect(() => stopSpeech, []);

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


  useEffect(() => {
    if (!currentQuestion) return;
    setTimeLeft(30);
    setTimerRunning(true);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimerRunning(false);
          stopSpeech();
          handleAnswer(-1); // temps écoulé
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentQuestion]);

  const startQuiz = () => {
    const selected = selectRandomQuestions(publishedQuestions, limit);
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
    setAvailableQuestions((prev) => prev.filter((_, i) => i !== idx));
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAnswer = (index: number) => {
    if (showResult) return;

    stopSpeech();
    setTimerRunning(false);
    setSelectedAnswer(index);
    setShowResult(true);

    const correct = index !== -1 && index === currentQuestion!.correctAnswer;

    setQuestionHistory((prev) => [
      ...prev,
      { ...currentQuestion, userAnswer: index, isCorrect: correct },
    ]);

    if (ttsEnabled) {
      setTimeout(() => speak(correct ? "Correct !" : "Incorrect !"), 200);
    }

    setTimeout(() => pickRandomQuestion(), 900);
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

  return {
    quizStarted,
    seeResults,
    currentQuestion,
    availableQuestions,
    questionHistory,
    selectedAnswer,
    showResult,
    ttsEnabled,
    isSpeaking,
    timeLeft,
    timerRunning,
    progress,
    score,
    total,
    startQuiz,
    pickRandomQuestion,
    handleAnswer,
    resetQuiz,
    setTtsEnabled,
    speak,
    stopSpeech,
  };
}

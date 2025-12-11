"use client";

import { Question } from "./useQuiz";

const QuizQuestion = ({
  question,
  selectedAnswer,
  showResult,
  onChoose,
  isDarkMode,
}: {
  question: Question;
  selectedAnswer: number | null;
  showResult: boolean;
  onChoose: (i: number) => void;
  isDarkMode: boolean;
}) => (
  <div className="p-2">
    <h2 className={`text-sm md:text-lg font-bold text-center my-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
      {question.question}
    </h2>

    <div className="space-y-3 mb-4">
      {question.answers.map((answer, i) => {
        const isSelected = selectedAnswer === i;
        const isCorrect = i === question.correctAnswer;

        return (
          <button
            key={i}
            onClick={() => onChoose(i)}
            disabled={showResult}
            className={`w-full px-4 py-2 rounded-2xl font-medium text-left transition-all ${
              showResult && isCorrect
                ? "bg-emerald-600 text-white"
                : showResult && isSelected && !isCorrect
                ? "bg-red-600 text-white"
                : isSelected
                ? "bg-indigo-600 text-white"
                : isDarkMode
                ? "bg-gray-800 text-white hover:bg-gray-700"
                : "bg-gray-100 text-gray-900 hover:bg-gray-200"
            }`}
          >
            <span className="text-xs md:text-sm">
              <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span>
              {answer}
            </span>
          </button>
        );
      })}
    </div>
  </div>
);

export default QuizQuestion;

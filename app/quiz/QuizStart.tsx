"use client";

const QuizStart = ({ onStart, isDarkMode }: { onStart: () => void; isDarkMode: boolean }) => (
  <div className="text-center">
    <h1 className={`text-2xl font-bold my-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
      Quiz Code & Conduite Connaissances Générales
    </h1>

    <p className={`italic text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
      Testez vos connaissances grâce à ce quiz
    </p>

    <p className="text-xs text-gray-500">15 questions aléatoires</p>

    <button
      className="mt-6 px-6 py-3 text-white font-bold text-lg rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600"
      onClick={onStart}
    >
      Démarrer le Quiz
    </button>
  </div>
);

export default QuizStart;

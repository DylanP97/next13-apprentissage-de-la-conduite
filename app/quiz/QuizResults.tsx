"use client";

const QuizResults = ({
  score,
  total,
  onRestart,
  isDarkMode,
}: {
  score: number;
  total: number;
  onRestart: () => void;
  isDarkMode: boolean;
}) => (
  <div className={`rounded-3xl p-8 text-center border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
    <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
      Quiz terminé !
    </h2>

    <p className={`text-5xl font-black mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
      {score} / {total}
    </p>

    <button
      onClick={onRestart}
      className="mt-6 w-full py-4 text-white font-bold rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600"
    >
      Recommencer
    </button>
  </div>
);

export default QuizResults;

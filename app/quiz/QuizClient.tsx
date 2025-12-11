"use client";

import { useTheme } from "../providers/ThemeProvider";
import { useQuiz } from "./useQuiz";

import QuizStart from "./QuizStart";
import QuizProgress from "./QuizProgress";
import QuizTimer from "./QuizTimer";
import TTSControls from "./TTSControls";
import QuizImage from "./QuizImage";
import QuizQuestion from "./QuizQuestion";
import QuizResults from "./QuizResults";

interface Props {
  publishedQuestions: any[];
}

const QuizClient: React.FC<Props> = ({ publishedQuestions }) => {
  const { isDarkMode } = useTheme();

  const {
    quizStarted,
    seeResults,
    currentQuestion,
    progress,
    timeLeft,
    selectedAnswer,
    showResult,
    ttsEnabled,
    isSpeaking,
    score,
    total,
    startQuiz,
    handleAnswer,
    resetQuiz,
    setTtsEnabled,
    speak,
    stopSpeech,
  } = useQuiz(publishedQuestions);

  if (!quizStarted) return <QuizStart onStart={startQuiz} isDarkMode={isDarkMode} />;

  if (seeResults) return <QuizResults score={score} total={total} onRestart={resetQuiz} isDarkMode={isDarkMode} />;

  return (
    <div className="flex flex-col items-center px-2 py-2 md:py-6" style={{ background: isDarkMode ? "#000014" : "#f9fafb" }}>
      <div className="w-full max-w-2xl">
        <QuizProgress progress={progress} />
        <QuizTimer timeLeft={timeLeft} isDarkMode={isDarkMode} />
        <div className="flex justify-between gap-2 mb-2">
          <button
            onClick={resetQuiz}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium ${isDarkMode ? "bg-red-900 text-white" : "bg-red-100 text-red-900"
              }`}
          >
            ✕ Quitter
          </button>
          <TTSControls
            ttsEnabled={ttsEnabled}
            isSpeaking={isSpeaking}
            onReplay={() => currentQuestion && speak(`${currentQuestion.question}. ${currentQuestion.answers.join(". ")}`)}
            onToggle={() => {
              stopSpeech(); // stoppe toute lecture en cours
              setTtsEnabled((prev) => !prev);
            }} isDarkMode={isDarkMode}
          />
        </div>

        <QuizImage src={currentQuestion?.imageUrl} />
        {currentQuestion && (
          <QuizQuestion
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            showResult={showResult}
            onChoose={handleAnswer}
            isDarkMode={isDarkMode}
          />
        )}
      </div>
    </div>
  );
};

export default QuizClient;

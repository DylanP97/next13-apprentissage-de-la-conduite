"use client";

const TTSControls = ({
  ttsEnabled,
  isSpeaking,
  onReplay,
  onToggle,
  isDarkMode,
}: {
  ttsEnabled: boolean;
  isSpeaking: boolean;
  onReplay: () => void;
  onToggle: () => void;
  isDarkMode: boolean;
}) => (
  <>
    <button
      onClick={onReplay}
      disabled={isSpeaking}
      className={`px-3 py-1.5 rounded-xl text-xs font-medium ${isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
        }`}
    >
      🔊 Réécouter
    </button>
    <button
      onClick={onToggle} 
      className={`px-3 py-1.5 rounded-xl text-xs font-medium ${ttsEnabled ? "bg-indigo-600 text-white" : isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100"
        }`}
    >
      {ttsEnabled ? "🔊 ON" : "🔇 OFF"}
    </button>

  </>
);

export default TTSControls;

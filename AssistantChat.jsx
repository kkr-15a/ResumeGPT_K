import React, { useEffect, useState } from "react";

const AssistantChat = ({ suggestions }) => {
  const [displayedText, setDisplayedText] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setDisplayedText([]);
    setCurrentIndex(0);
  }, [suggestions]);

  useEffect(() => {
    if (suggestions.length && currentIndex < suggestions.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => [...prev, suggestions[currentIndex]]);
        setCurrentIndex((prev) => prev + 1);
      }, 700); // adjust typing speed here
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, suggestions]);

  return (
    <div className="fixed bottom-5 right-5 w-80 bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-xl rounded-lg p-4 text-sm z-50 animate-fade">
      <h4 className="text-blue-700 dark:text-blue-300 font-semibold mb-2">
        💬 AI Assistant
      </h4>

      {displayedText.length > 0 ? (
        <ul className="space-y-2">
          {displayedText.map((s, i) => (
            <li key={i} className="text-gray-800 dark:text-gray-100">
              <strong>“{s.phrase}”</strong>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                💡 {s.suggestion}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 italic">
          Analyzing your resume...
        </p>
      )}
    </div>
  );
};

export default AssistantChat;

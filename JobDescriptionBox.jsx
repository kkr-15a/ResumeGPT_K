import React from "react";

const Sidebar = ({
  resumeText = "",
  suggestions = [],
  score = 0,
  jobText = "",
}) => {
  const getImpactColor = (word) => {
    const rule = suggestions.find((s) =>
      new RegExp(`\b${s.phrase}\b`, "i").test(word)
    );
    if (!rule) return "bg-green-100 text-green-800";
    return rule.impact === "high"
      ? "bg-red-100 text-red-700"
      : "bg-yellow-100 text-yellow-800";
  };

  const words = resumeText.trim().split(/\s+/).slice(0, 30);

  const getTopJDKeywords = () => {
    if (!jobText) return [];
    const allWords = jobText.toLowerCase().match(/\b\w{4,}\b/g) || [];
    const frequency = {};
    allWords.forEach((word) => {
      frequency[word] = (frequency[word] || 0) + 1;
    });
    return Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word]) => word);
  };

  return resumeText.trim().length === 0 ? null : (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md space-y-6 text-sm">
      <div>
        <h2 className="text-base font-semibold mb-2 text-blue-700 dark:text-blue-300">
          📊 Resume Insights
        </h2>
        <p>
          <strong>Words:</strong> {resumeText.trim().split(/\s+/).length}
        </p>
        <p>
          <strong>Score:</strong> {score} / 100
        </p>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
          💬 Impact Heatmap
        </h3>
        <div className="flex flex-wrap gap-1">
          {words.map((word, i) => (
            <span
              key={i}
              className={`px-2 py-1 rounded-md text-xs ${getImpactColor(word)}`}
            >
              {word}
            </span>
          ))}
        </div>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          This shows impact of your first 30 resume words.
        </p>
      </div>

      {jobText && (
        <div>
          <h3 className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
            🎯 Top JD Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {getTopJDKeywords().map((word, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
          💡 Suggestions
        </h3>
        <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
          {suggestions.slice(0, 5).map((s, i) => (
            <li key={i}>
              <em>{s.phrase}</em>: {s.suggestion}
            </li>
          ))}
          {suggestions.length > 5 && <li>+{suggestions.length - 5} more...</li>}
        </ul>
      </div>

      <div className="pt-2 border-t dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Keep score above 80. Replace weak phrases with clear, action-driven
          language.
        </p>
      </div>
    </div>
  );
};

export default Sidebar;

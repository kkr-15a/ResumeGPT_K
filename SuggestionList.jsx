import React from "react";

const SuggestionList = ({ suggestions }) => {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">Suggestions:</h2>
      <ul className="space-y-2">
        {suggestions.map((item, index) => (
          <li
            key={index}
            className="p-3 bg-yellow-100 dark:bg-yellow-300 text-black rounded border"
          >
            🔍 <strong>Issue:</strong> <em>{item.phrase}</em> <br />
            💡 <strong>Suggestion:</strong> {item.suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestionList;

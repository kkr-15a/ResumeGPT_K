import React from "react";

const HighlightedText = ({ text, suggestions }) => {
  if (!text) return null;

  let processedText = text;

  suggestions.forEach((item) => {
    const regex = new RegExp(`\\b(${item.phrase})\\b`, "gi");
    processedText = processedText.replace(
      regex,
      `<span class="relative group bg-yellow-200 underline decoration-red-500 cursor-pointer">
        $1
        <span class="hidden group-hover:block absolute z-10 bg-white text-black text-xs p-2 border rounded shadow-lg w-60 top-full left-0 mt-1">
          ${item.suggestion}
        </span>
      </span>`
    );
  });

  return (
    <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded border prose prose-sm max-w-none">
      <div
        dangerouslySetInnerHTML={{ __html: processedText }}
        className="leading-relaxed"
      ></div>
    </div>
  );
};

export default HighlightedText;

// components/Tooltip.jsx
import React, { useState } from "react";

const Tooltip = ({
  phrase,
  explanation,
  type,
  highImpact,
  impact = "medium",
}) => {
  const [show, setShow] = useState(false);

  const colors = {
    high: "bg-red-200 text-red-800 border-red-600",
    medium: "bg-yellow-200 text-yellow-800 border-yellow-600",
    low: "bg-blue-200 text-blue-800 border-blue-600",
  };

  const badgeColors = {
    high: "bg-red-600 text-white",
    medium: "bg-yellow-500 text-black",
    low: "bg-blue-500 text-white",
  };

  return (
    <span
      className={`relative group cursor-pointer underline decoration-wavy decoration-${
        impact === "high" ? "red" : impact === "medium" ? "yellow" : "blue"
      }-500 px-1 rounded`}
      onClick={() => setShow(!show)}
    >
      {phrase}

      <span
        className={`ml-1 inline-block px-1 py-0.5 text-xs rounded-full font-semibold ${badgeColors[impact]}`}
      >
        {impact.charAt(0).toUpperCase() + impact.slice(1)}
      </span>

      {show && (
        <div
          className={`absolute z-50 w-72 mt-2 p-3 border shadow-xl rounded text-sm ${colors[impact]} left-0 top-full animate-fade-in`}
        >
          <strong className="block mb-1">
            ⚠ {impact.charAt(0).toUpperCase() + impact.slice(1)} Impact Phrase
          </strong>
          <span>{explanation}</span>
        </div>
      )}
    </span>
  );
};

export default Tooltip;

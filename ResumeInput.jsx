import React from "react";

const ResumeInput = ({ resumeText, setResumeText, analyzeResume }) => {
  return (
    <div className="p-4">
      <textarea
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
        rows="12"
        className="w-full p-3 border border-gray-400 rounded-md dark:bg-gray-800 dark:text-white"
        placeholder="Paste your resume here..."
      ></textarea>
      <button
        onClick={analyzeResume}
        className="mt-3 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
      >
        Analyze Resume
      </button>
    </div>
  );
};

export default ResumeInput;

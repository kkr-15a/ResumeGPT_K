import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadBox from "./UploadBox";
import Tooltip from "./Tooltip";
import Sidebar from "./SideBar";
import JobDescriptionBox from "./JobDescriptionBox";
import AssistantChat from "./AssistantChat";
import { enhancementRules } from "../utils/enhancementRules";

const ResumeEditor = () => {
  const navigate = useNavigate();
  const [resumeText, setResumeText] = useState("");
  const [jobText, setJobText] = useState("");
  const [rewrittenText, setRewrittenText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [strengths, setStrengths] = useState([]);
  const [repeatedPhrases, setRepeatedPhrases] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  const strongPhrases = [
    "led",
    "optimized",
    "architected",
    "built",
    "improved",
    "resolved",
    "delivered",
  ];

  const analyzeResume = (inputText = resumeText) => {
    let updated = inputText;
    const detected = [];
    const positives = [];
    const wordCounts = {};

    enhancementRules.forEach((rule) => {
      const regex = new RegExp(`\\b${rule.phrase}\\b`, "gi");
      const matches = inputText.match(regex);
      if (matches) {
        detected.push({ ...rule, count: matches.length });
        updated = updated.replace(regex, rule.replacement);
      }
    });

    const words = inputText.toLowerCase().split(/\W+/);
    words.forEach((word) => {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    });

    const repeated = Object.entries(wordCounts)
      .filter(([word, count]) => count > 3 && word.length > 4)
      .map(([word]) => word);

    strongPhrases.forEach((word) => {
      if (inputText.toLowerCase().includes(word)) {
        positives.push(word);
      }
    });

    setSuggestions(detected);
    setRewrittenText(updated);
    setRepeatedPhrases(repeated);
    setStrengths(positives);
  };

  const getScore = () => {
    if (!resumeText) return 0;
    let score = 100;
    suggestions.forEach((s) => {
      const weight = s.weight || 5;
      score -= weight * (s.count || 1);
    });
    return Math.max(score, 0);
  };

  const getHighlightedText = (text, type = "suggestion") => {
    const words = text.split(/(\s+|\b)/);
    return words.map((word, index) => {
      const rule = suggestions.find((r) =>
        new RegExp(`\\b${r.phrase}\\b`, "i").test(word)
      );
      if (rule) {
        return (
          <Tooltip
            key={index}
            phrase={word}
            explanation={rule.suggestion}
            type={type}
            highImpact={rule.impact === "high"}
          />
        );
      } else {
        return <span key={index}>{word}</span>;
      }
    });
  };

  const getMissingSkills = () => {
    if (!jobText || !resumeText) return [];
    const jdWords = new Set(jobText.toLowerCase().match(/\b[a-zA-Z]{4,}\b/g));
    const resumeWords = new Set(
      resumeText.toLowerCase().match(/\b[a-zA-Z]{4,}\b/g)
    );
    return Array.from(jdWords)
      .filter((word) => !resumeWords.has(word))
      .slice(0, 5);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="flex justify-between items-center px-6 py-4 shadow-md bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <h1 className="text-lg font-bold text-blue-700 dark:text-blue-300">
          ResumeGPT
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-100 text-red-700 text-sm px-4 py-1.5 rounded-md hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800 transition"
        >
          🔓 Logout
        </button>
      </header>

      <main className="flex flex-col lg:flex-row gap-6 p-6">
        <div className="flex-1 space-y-6">
          <UploadBox
            onUpload={(text) => {
              setResumeText(text);
              analyzeResume(text);
            }}
          />

          <textarea
            value={resumeText}
            onChange={(e) => {
              const value = e.target.value;
              setResumeText(value);
              analyzeResume(value);
            }}
            rows="10"
            className="w-full text-sm p-4 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
            placeholder="Paste your resume here..."
          ></textarea>

          <JobDescriptionBox jobText={jobText} setJobText={setJobText} />

          {getMissingSkills().length > 0 && (
            <div className="bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-400 p-4 rounded-md mt-4 shadow">
              <h3 className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-1">
                🧠 Smart Assistant Suggestion
              </h3>
              <p className="text-xs text-gray-700 dark:text-gray-300">
                You're missing these key skills from the job description:
              </p>
              <ul className="list-disc pl-4 text-sm mt-1 text-blue-800 dark:text-blue-200">
                {getMissingSkills().map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
          )}

          {strengths.length > 0 && (
            <div className="bg-green-50 dark:bg-green-900 border-l-4 border-green-500 p-4 rounded-md shadow">
              <h3 className="text-sm font-semibold text-green-700 dark:text-green-300 mb-1">
                ✅ Strengths Detected
              </h3>
              <p className="text-xs text-gray-700 dark:text-gray-300">
                Great use of strong action verbs:
              </p>
              <ul className="list-disc pl-4 text-sm mt-1 text-green-800 dark:text-green-200">
                {strengths.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}

          {repeatedPhrases.length > 0 && (
            <div className="bg-red-50 dark:bg-red-900 border-l-4 border-red-400 p-4 rounded-md shadow">
              <h3 className="text-sm font-semibold text-red-700 dark:text-red-300 mb-1">
                ⚠️ Repetitive Phrases
              </h3>
              <p className="text-xs text-gray-700 dark:text-gray-300">
                Consider reducing usage of:
              </p>
              <ul className="list-disc pl-4 text-sm mt-1 text-red-800 dark:text-red-200">
                {repeatedPhrases.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          )}

          {suggestions.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                <h2 className="text-lg font-semibold mb-2">
                  ✍️ Original Resume
                </h2>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  {getHighlightedText(resumeText, "suggestion")}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                <h2 className="text-lg font-semibold mb-2">
                  🛠️ Rewritten Resume
                </h2>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  {getHighlightedText(rewrittenText, "rewrite")}
                </div>
              </div>
            </div>
          )}
        </div>

        <Sidebar
          resumeText={resumeText}
          suggestions={suggestions}
          score={getScore()}
          jobText={jobText}
        />

        <AssistantChat suggestions={suggestions} />
      </main>
    </div>
  );
};

export default ResumeEditor;

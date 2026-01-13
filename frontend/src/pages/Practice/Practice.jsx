import { useState, useMemo } from "react";

import useFetch from "../../hooks/useFetch";
import { getPatterns } from "../../services/pattern.service";
import { getAllProblems } from "../../services/problem.service";
import { getCompletedProblems } from "../../services/progress.service";

import { generatePracticeSet } from "../../utils/practiceGenerator";

import PatternSelector from "./PatternSelector";
import PracticeResult from "./PracticeResult";

const Practice = () => {
  // fetch patterns
  const { data: patternsRes, loading: patternsLoading } =
    useFetch(getPatterns);

  // fetch ALL problems
  const { data: problemsRes, loading: problemsLoading } =
    useFetch(getAllProblems);

  const patterns = patternsRes?.data || [];
  const allProblems = problemsRes?.data || [];

  // UI state
  const [selectedPatterns, setSelectedPatterns] = useState([]);
  const [count, setCount] = useState(3);
  const [result, setResult] = useState([]);

  // 🔹 build patternId -> patternName map
  const patternMap = useMemo(() => {
    const map = {};
    patterns.forEach((p) => {
      map[p._id] = p.name;
    });
    return map;
  }, [patterns]);

  // 🔹 filter problems + attach patternName
  const filteredProblems = useMemo(() => {
    if (!selectedPatterns.length) return [];

    return allProblems
      .filter((p) => selectedPatterns.includes(p.pattern))
      .map((p) => ({
        ...p,
        patternName: patternMap[p.pattern],
      }));
  }, [allProblems, selectedPatterns, patternMap]);

  const handleGenerate = () => {
    if (!filteredProblems.length) return;

    const completedIds = getCompletedProblems();

    const practiceSet = generatePracticeSet({
      problems: filteredProblems,
      completedIds,
      count,
    });

    setResult(practiceSet);
  };

  if (patternsLoading || problemsLoading) {
    return (
      <div className="py-20 text-center text-zinc-400">
        Loading practice…
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="mb-6 text-2xl font-semibold text-white">
        Practice Session
      </h1>

      {/* Pattern selection */}
      <PatternSelector
        patterns={patterns}
        selected={selectedPatterns}
        onChange={setSelectedPatterns}
      />

      {/* Count selector */}
      <div className="mt-6 flex items-center gap-3">
        {[3, 4, 5].map((n) => (
          <button
            key={n}
            onClick={() => setCount(n)}
            className={`rounded-md px-3 py-1 text-sm ${
              count === n
                ? "bg-primary text-zinc-950"
                : "border border-zinc-800 text-zinc-400"
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      {/* Generate button */}
      <button
        onClick={handleGenerate}
        disabled={!selectedPatterns.length}
        className="mt-6 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-zinc-950 disabled:opacity-50"
      >
        Generate Practice
      </button>

      {/* Result */}
      <PracticeResult problems={result} />
    </section>
  );
};

export default Practice;

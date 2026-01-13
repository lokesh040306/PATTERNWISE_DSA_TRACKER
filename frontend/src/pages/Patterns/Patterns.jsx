import useFetch from "../../hooks/useFetch";
import { getPatterns } from "../../services/pattern.service";
import { getPatternProgress } from "../../services/progress.api";
import PatternCard from "./PatternCard";

/**
 * Patterns Page
 * Shows all available patterns with real progress
 */
const Patterns = () => {
  const {
    data: patternsRes,
    loading: patternsLoading,
    error: patternsError,
  } = useFetch(getPatterns);

  const {
    data: progressRes,
    loading: progressLoading,
  } = useFetch(getPatternProgress);

  if (patternsLoading || progressLoading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-zinc-400">
          Loading patterns…
        </p>
      </section>
    );
  }

  if (patternsError) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-red-400">
          Failed to load patterns
        </p>
      </section>
    );
  }

  const patterns = patternsRes?.data || [];
  const progressList = progressRes?.data || [];

  // 🔗 Merge progress into patterns
  const progressMap = {};
  progressList.forEach((item) => {
    progressMap[item.patternId] = item;
  });

  const mergedPatterns = patterns.map((pattern) => {
    const progress = progressMap[pattern._id];

    return {
      ...pattern,
      completedCount: progress?.completedCount ?? 0,
      totalCount: progress?.totalCount ?? 0,
    };
  });

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      {/* Header */}
      <header className="mb-12 max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">
          DSA Patterns
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          Learn Data Structures & Algorithms through proven problem-solving
          patterns. Track your progress and focus on what matters most.
        </p>
      </header>

      {/* Content */}
      {mergedPatterns.length === 0 ? (
        <p className="text-sm text-zinc-400">
          No patterns found.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mergedPatterns.map((pattern) => (
            <PatternCard
              key={pattern._id}
              pattern={pattern}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Patterns;
